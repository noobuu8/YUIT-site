import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

// Disable body parser for formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Constants
const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 30 * 1024 * 1024; // 30MB
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf'];
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
];

// Types
interface FormFields {
  name?: string | string[];
  email?: string | string[];
  category?: string | string[];
  kana?: string | string[];
  phone?: string | string[];
  message?: string | string[];
}

interface ParsedForm {
  fields: FormFields;
  files: File[];
}

interface Attachment {
  filename: string;
  content: Buffer;
}

// Helper: Get first value from field (formidable can return arrays)
function getFieldValue(field: string | string[] | undefined): string {
  if (Array.isArray(field)) {
    return field[0] || '';
  }
  return field || '';
}

// Helper: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper: Parse form with formidable
function parseForm(req: VercelRequest): Promise<ParsedForm> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFiles: MAX_FILES,
      maxTotalFileSize: MAX_TOTAL_SIZE,
      filter: ({ mimetype, originalFilename }) => {
        // Check mime type
        if (mimetype && !ALLOWED_MIME_TYPES.includes(mimetype)) {
          return false;
        }
        // Check extension
        if (originalFilename) {
          const ext = path.extname(originalFilename).toLowerCase();
          if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return false;
          }
        }
        return true;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      // Normalize files to array
      const fileList: File[] = [];
      if (files.attachments) {
        const attachments = files.attachments;
        if (Array.isArray(attachments)) {
          fileList.push(...attachments);
        } else {
          fileList.push(attachments);
        }
      }

      resolve({
        fields: fields as FormFields,
        files: fileList,
      });
    });
  });
}

// Helper: Validate attachments
function validateAttachments(files: File[]): { valid: boolean; error?: string } {
  // Check file count
  if (files.length > MAX_FILES) {
    return { valid: false, error: `Maximum ${MAX_FILES} files allowed` };
  }

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return { valid: false, error: 'Total file size exceeds 30MB limit' };
  }

  // Check each file
  for (const file of files) {
    const ext = path.extname(file.originalFilename || '').toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        valid: false,
        error: `Invalid file extension: ${ext}. Allowed: png, jpg, jpeg, pdf`,
      };
    }
  }

  return { valid: true };
}

// Helper: Read files and convert to attachments
async function prepareAttachments(files: File[]): Promise<Attachment[]> {
  const attachments: Attachment[] = [];

  for (const file of files) {
    if (file.filepath && file.originalFilename) {
      try {
        const content = fs.readFileSync(file.filepath);
        attachments.push({
          filename: file.originalFilename,
          content: content,
        });
      } catch {
        // Skip files that can't be read
        console.error(`Failed to read file: ${file.originalFilename}`);
      }
    }
  }

  return attachments;
}

// Helper: Clean up temp files
function cleanupFiles(files: File[]): void {
  for (const file of files) {
    if (file.filepath) {
      try {
        fs.unlinkSync(file.filepath);
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

// Helper: Build email HTML body
function buildEmailHtml(data: {
  name: string;
  email: string;
  category: string;
  kana: string;
  phone: string;
  message: string;
}): string {
  const labelCategory = '\u304A\u554F\u3044\u5408\u308F\u305B\u9805\u76EE';
  const labelName = '\u6C0F\u540D\u30FB\u4F1A\u793E\u540D';
  const labelKana = '\u30D5\u30EA\u30AC\u30CA';
  const labelEmail = '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9';
  const labelPhone = '\u96FB\u8A71\u756A\u53F7';
  const labelMessage = '\u304A\u554F\u3044\u5408\u308F\u305B\u5185\u5BB9';

  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 20px; margin-bottom: 20px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: bold; color: #666; margin-bottom: 4px; }
    .value { padding: 8px; background: #f5f5f5; border-radius: 4px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;font-size:20px;">YUIT Contact Form</h1>
    </div>
    <div class="field">
      <div class="label">${labelCategory}</div>
      <div class="value">${escapeHtml(data.category)}</div>
    </div>
    <div class="field">
      <div class="label">${labelName}</div>
      <div class="value">${escapeHtml(data.name)}</div>
    </div>`;

  if (data.kana) {
    html += `
    <div class="field">
      <div class="label">${labelKana}</div>
      <div class="value">${escapeHtml(data.kana)}</div>
    </div>`;
  }

  html += `
    <div class="field">
      <div class="label">${labelEmail}</div>
      <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
    </div>`;

  if (data.phone) {
    html += `
    <div class="field">
      <div class="label">${labelPhone}</div>
      <div class="value">${escapeHtml(data.phone)}</div>
    </div>`;
  }

  if (data.message) {
    html += `
    <div class="field">
      <div class="label">${labelMessage}</div>
      <div class="value" style="white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    </div>`;
  }

  html += `
    <div class="footer">
      This email was sent from YUIT website contact form.
    </div>
  </div>
</body>
</html>`;

  return html;
}

// Helper: Escape HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Main handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  let files: File[] = [];

  try {
    // Parse form data
    const { fields, files: parsedFiles } = await parseForm(req);
    files = parsedFiles;

    // Extract and validate required fields
    const name = getFieldValue(fields.name);
    const email = getFieldValue(fields.email);
    const category = getFieldValue(fields.category);
    const kana = getFieldValue(fields.kana);
    const phone = getFieldValue(fields.phone);
    const message = getFieldValue(fields.message);

    // Validate required fields
    if (!name || !name.trim()) {
      res.status(400).json({ ok: false, message: 'Name is required' });
      return;
    }

    if (!email || !email.trim()) {
      res.status(400).json({ ok: false, message: 'Email is required' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ ok: false, message: 'Invalid email format' });
      return;
    }

    if (!category || !category.trim()) {
      res.status(400).json({ ok: false, message: 'Category is required' });
      return;
    }

    // Validate attachments
    if (files.length > 0) {
      const validation = validateAttachments(files);
      if (!validation.valid) {
        res.status(400).json({ ok: false, message: validation.error });
        return;
      }
    }

    // Prepare attachments for email
    const attachments = await prepareAttachments(files);

    // Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      res.status(500).json({ ok: false, message: 'Server configuration error' });
      return;
    }

    const resend = new Resend(resendApiKey);

    // Build email content
    const subject = `[YUIT Contact] ${category} - ${name}`;
    const htmlBody = buildEmailHtml({
      name,
      email,
      category,
      kana,
      phone,
      message,
    });

    // Send email
    const { error } = await resend.emails.send({
      from: 'YUIT Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'info@yuit-inc.jp',
      replyTo: email,
      subject,
      html: htmlBody,
      attachments: attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    });

    if (error) {
      console.error('Resend error:', error);
      res.status(500).json({ ok: false, message: 'Failed to send email' });
      return;
    }

    // Success
    res.status(200).json({ ok: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Handler error:', err);

    // Handle formidable errors
    if (err instanceof Error) {
      if (err.message.includes('maxTotalFileSize')) {
        res.status(400).json({ ok: false, message: 'Total file size exceeds 30MB limit' });
        return;
      }
      if (err.message.includes('maxFiles')) {
        res.status(400).json({ ok: false, message: `Maximum ${MAX_FILES} files allowed` });
        return;
      }
    }

    res.status(500).json({ ok: false, message: 'Internal server error' });
  } finally {
    // Clean up temp files
    cleanupFiles(files);
  }
}
