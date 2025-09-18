import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ChildrenProtection() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">儿童个人信息保护规则</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <div className="markdown-content">
          <h1 className="text-xl font-bold mb-4">轻照AI儿童个人信息保护规则</h1>
          
          <p className="text-sm text-gray-600 mb-6">
            <strong>生效日期：2025年9月17日</strong>
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <p className="text-sm leading-relaxed">
              轻照AI（以下简称"我们"或"轻照AI"）深知保护儿童（指未满十四周岁的未成年人，下同）个人信息安全和隐私的重要性。本规则在<Link href="/privacy" className="text-primary underline" data-testid="link-privacy-intro">《隐私政策》</Link>基础上制定，旨在向儿童及其监护人说明我们在收集、使用、存储、共享和披露儿童个人信息时的处理原则和措施。<strong>请在使用轻照AI产品及服务前仔细阅读本规则，尤其注意加粗内容，并在充分理解和同意后，让儿童使用本产品及服务。</strong>
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">监护人须知</h2>
            <p className="text-sm leading-relaxed">
              如果您是儿童的监护人（父母或其他监护人），请仔细阅读本规则并决定是否同意。我们希望与您共同保护儿童个人信息，并指导儿童增强个人信息保护意识。
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">儿童须知</h2>
            <p className="text-sm leading-relaxed">
              如果您是儿童，请在使用轻照AI前通知您的监护人，共同阅读本规则，并在获得监护人同意后提交个人信息。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">适用范围</h2>
            <p className="text-sm leading-relaxed">
              本规则适用于轻照AI在中华人民共和国境内通过网络提供产品及服务时，涉及儿童个人信息的收集、使用、存储、共享和披露。本规则为<Link href="/privacy" className="text-primary underline" data-testid="link-privacy-scope">《隐私政策》</Link>的补充说明，如与隐私政策存在冲突，以本规则为准。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">一、我们如何收集和使用儿童个人信息</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. 遵循合法、正当、必要、知情同意的原则</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>在征得监护人同意后收集儿童个人信息。</li>
                  <li>您在产品中主动提交儿童信息（如上传照片）即表示同意我们按照本规则使用这些信息。</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. 提供核心服务功能</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>为实现数字分身生成、头像生成等功能，可能需要收集儿童照片及基本信息。</li>
                  <li>若不提供相关信息，可能无法使用对应服务。</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. 自动收集信息</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>我们可能通过 Cookies、SDK 或类似技术收集儿童的设备信息和使用数据，用于优化服务体验和功能。</li>
                  <li>如需收集超出必要范围的信息，我们会再次征得监护人同意。</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. 无需征得同意的情形</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>法律法规要求履行义务；</li>
                  <li>涉及国家安全、公共安全、公共卫生或重大公共利益；</li>
                  <li>犯罪侦查、审判或执行；</li>
                  <li>为保护儿童重大合法权益且无法获取监护人同意；</li>
                  <li>儿童或监护人已自行公开的信息；</li>
                  <li>合法公开渠道信息（新闻报道、政府公开信息等）；</li>
                  <li>产品安全维护所需；</li>
                  <li>公共利益统计或学术研究且结果去标识化；</li>
                  <li>法律法规规定的其他情形。</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">二、我们如何共享、转让、公开披露儿童个人信息</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. 严格保密</h3>
                <p>未经授权，我们不会向第三方共享儿童个人信息。</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. 委托处理</h3>
                <p className="mb-2">我们可能委托有能力的公司或机构代为处理信息，但会要求其：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>合法、正当、必要地处理信息；</li>
                  <li>协助回应监护人请求；</li>
                  <li>采取安全保护措施，并在发生泄露时及时通知；</li>
                  <li>解除委托时删除信息；</li>
                  <li>不得转委托。</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. 共享前同意</h3>
                <p>在信息共享前，我们将确认已获得监护人同意，或确认第三方已取得必要授权。</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">五、儿童个人信息管理</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. 信息访问与管理</h3>
                <p>我们在客户端提供相关设置，便于监护人访问和管理儿童信息，包括修改、删除和注销功能。</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. 删除请求</h3>
                <p className="mb-2">在以下情形，监护人可联系轻照AI删除儿童个人信息：</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>收集、存储或使用信息违反法律或约定；</li>
                  <li>信息收集超出目的或期限；</li>
                  <li>撤回同意；</li>
                  <li>注销账户或终止服务。</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">七、联系我们</h2>
            <div className="space-y-2 text-sm">
              <p>如对本规则或儿童个人信息处理有疑问、投诉或意见，可通过以下方式联系：</p>
              <p>1. 邮箱联系：info@swifto.com（请注明与轻照AI有关，并说明具体情况）；</p>
              <p className="font-semibold">若对我们的回复不满意，可依法向有管辖权的法院提起诉讼解决。</p>
            </div>
          </section>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-gray-500">
              如有疑问，请联系：info@swifto.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}