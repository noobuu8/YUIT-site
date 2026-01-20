import { Link } from 'react-router-dom';
import { ThemeType } from '../../types';
import { ArrowRight } from 'lucide-react';

export const PrivacyPolicy = ({ theme }: { theme: ThemeType }) => {
  const isPop = theme === ThemeType.POP;

  const sectionHeadingClass = "text-xl md:text-3xl font-extrabold mt-10 mb-3";
  const bodyTextClass = "text-base md:text-xl leading-relaxed";

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isPop ? 'bg-yellow-50' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl md:text-7xl font-black mb-12 ${isPop ? 'bg-white border-4 border-black inline-block px-8 py-4 shadow-[8px_8px_0px_0px_#38B2AC]' : ''}`}>
            Privacy Policy
          </h1>

          <div className={`text-left ${isPop ? 'bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_black]' : 'bg-white p-8 md:p-12 shadow-lg rounded-xl'}`}>
            <p className={bodyTextClass}>
              株式会社 YUITは個人情報取り扱い事業者として個人情報保護に関連する法令を遵守し、ご提供いただく個人情報について、細心の注意を払って取り扱い、管理致します。
            </p>

            <h2 className={sectionHeadingClass}>1. 個人情報の定義</h2>
            <p className={bodyTextClass}>
              本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義される個人情報を意味するものとします。 例）氏名、性別、生年月日、住所、電話番号、メールアドレス、職業、ご契約情報等、特定の個人が識別され得るもの
            </p>

            <h2 className={sectionHeadingClass}>2. 個人情報の利用目的</h2>
            <p className={bodyTextClass}>
              当社は、個人情報を以下の目的で利用します。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>お電話あるいはダイレクトメール等により、当社の事業または商品のご案内のため</li>
              <li>契約締結後のサービス提供またご案内のため</li>
              <li>当社サービス導入意思決定後の契約の締結、情報の提供、取引の履行のため</li>
              <li>当社新入社員・中途社員募集の採用選考のため</li>
              <li>上記1～4の利用目的に準じ、お客様の同意を得た上で、必要範囲内で第三者へ提供するため</li>
              <li>上記1～5の該当の有無に関わらず、ご本人様の申し出があった時点で個人情報の削除を実施します</li>
            </ol>

            <h2 className={sectionHeadingClass}>3. 第三者への提供</h2>
            <p className={bodyTextClass}>
              当社は、個人情報を以下の場合を除いては第三者への開示・提供は行わないものとします。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>お客様の同意がある場合。</li>
              <li>お客様個人を識別できない状況で開示する場合。</li>
              <li>上記利用目的を円滑に達成する為、業務委託先、又は提携先に預託する場合。</li>
              <li>法令等に基づき、裁判所、警察機関などの公的機関から開示の要請があった場合。</li>
              <li>公衆衛生上、または児童の健全な育成推進に特に必要であり、お客様の同意を得ることが困難な場合。</li>
              <li>国の機関や地方公共団体などが法令上の事務を遂行するのに協力が必要で、お客様の同意を得ることにより当該事務の遂行に支障を及ぼす恐れがある場合。</li>
            </ol>

            <h2 className={sectionHeadingClass}>4. 個人情報の管理</h2>
            <p className={bodyTextClass}>
              個人情報は正確かつ最新の状態に保ち、個人情報への不正アクセス、紛失、改ざん及び漏洩等の予防に努めます。 個人情報を取り扱う部門に関し責任者を置き、適切な管理を行います。
            </p>

            <h2 className={sectionHeadingClass}>5. 個人情報の開示及び訂正、削除、利用の停止</h2>
            <p className={bodyTextClass}>
              当社は、お客様ご本人からご自身に関する個人情報の訂正、削除のお申し出があり、ご本人確認が可能な場合は速やかに対応いたします。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>当社からお客様に送付するサービス、商品のご案内やその他の通知について、お客様が送付の停止を希望される場合は、当社までご連絡下さい。</li>
              <li>お客様が当社に対し、当社が保有しているお客様の個人情報の開示及び個人情報の訂正、追加または削除を請求される場合は、書面または電子メールによりご請求下さい。なお、この場合、当社は請求者に対して、請求者が請求の対象である個人情報に係るお客様本人であることを確認する為、当該確認に必要な書類等の提示を求める可能性があります。</li>
            </ol>

            <h2 className={sectionHeadingClass}>6. リンク先における個人情報の取り扱い</h2>
            <p className={bodyTextClass}>
              本ホームページではお客様に対し有用な情報・サービスを提供する為に、他の会社のホームページへのリンクを紹介することがございます。 リンク先のホームページにて行われる個人情報の収集に関しましては、当社は一切管理責任を負いません。お客様ご自身の判断によってご利用下さい。
            </p>

            <h2 className={sectionHeadingClass}>7. 個人情報窓口</h2>
            <p className={bodyTextClass}>
              弊社への個人情報に関する（訂正・削除・使用停止等）お問合せは、以下にて受け付けております。
            </p>
            <div className={`${bodyTextClass} mt-4 ml-4`}>
              <p>名称　：    株式会社 YUIT</p>
              <p>管理部：    盛島加菜</p>
              <p>所在地：    〒902-0067</p>
              <p>　　　　    沖縄県那覇市安里381-1</p>
              <p>　　　　    ZORKS沖縄 8F</p>
              <p>E-mail：    info@yuit-inc.jp</p>
            </div>
          </div>

          <Link
            to="/"
            className={`inline-flex items-center gap-3 mt-12 px-8 py-4 font-bold text-lg md:text-2xl transition-colors ${
              isPop
                ? 'bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_#38B2AC]'
                : 'bg-slate-800 text-white rounded hover:bg-slate-700'
            }`}
          >
            <ArrowRight size={24} className="rotate-180" />
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};
