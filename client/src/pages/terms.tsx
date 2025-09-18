import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">用户服务协议</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <div className="markdown-content">
          <h1 className="text-xl font-bold mb-4">用户服务协议</h1>
          
          <p className="text-sm text-gray-600 mb-6">
            <strong>修改日期：2025年8月25日 生效日期：2025年9月17日</strong>
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">提示条款</h2>
            <p className="text-sm leading-relaxed">
              欢迎您使用轻照AI！
            </p>
            <p className="text-sm leading-relaxed mt-2">
              为使用轻照AI提供的相关服务（以下简称"本服务"），您应当阅读并遵守《用户服务协议》（以下简称"本协议"）。<strong>建议您仔细阅读本协议的全部内容，尤其是以加粗形式展示的，与您的权益（可能）存在重大关系的条款（包括相关约定免除或者限制责任的条款、法律适用和争议解决等条款），请您务必审慎阅读、充分理解各条款内容。</strong>各条款标题仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为保障您自身权益，建议您重点阅读各条款。
            </p>
            <p className="text-sm leading-relaxed mt-2">
              <strong>您点击同意或您使用本服务（"使用"行为指包括但不限于下载、安装、启动、浏览、注册、登录等行为中的一种或多种，下同），即表示您已阅读并同意签署本协议所有内容，本协议即在您与轻照AI之间产生法律效力，成为对双方均具有约束力的法律文件。如您不同意轻照AI不时对本协议的修改或补充内容，您应放弃注册、停止使用或主动取消本服务。</strong>
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">本《用户服务协议》将帮助您了解以下内容：</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li><strong>定义</strong></li>
              <li><strong>协议范围</strong></li>
              <li><strong>账号注册与使用</strong></li>
              <li><strong>本服务及规则</strong></li>
              <li><strong>人工智能生成合成内容的标识规则</strong></li>
              <li><strong>知识产权</strong></li>
              <li><strong>个人信息及未成年保护</strong></li>
              <li><strong>责任的限制和免除</strong></li>
              <li><strong>协议的变更</strong></li>
              <li><strong>法律适用、管辖与其他</strong></li>
            </ol>
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">1. 定义</h2>
            <div className="space-y-3 text-sm">
              <p><strong>1.1 我方或我们</strong>：是指轻照AI及其相关服务可能存在的运营关联单位（如存在将在实际提供时向您适时披露），但不包括第三方功能及相关服务的实际提供方。</p>
              <p><strong>1.2 本服务</strong>：向您提供各项产品及/或服务的轻照AI客户端、小程序、H5页面及随技术发展出现的新形态。</p>
              <p><strong>1.3 服务规则</strong>：包括所有在本服务时已经发布及后续发布的全部规则、解读、公告等内容以及在各频道、活动页面、帮助中心等发布的各类规则、实施细则、产品说明、公告等。</p>
              <p><strong>1.4 用户或您</strong>：接受并同意本协议全部条款及轻照AI发布的其他全部服务条款和操作规则的用户。包括注册用户及未注册用户，凡未注册本服务的用户，自开始使用本服务时即成为我们的"非注册用户"，在使用过程中须遵循本协议中除注册用户专属约定以外的其他所有条款。</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">2. 协议范围</h2>
            <div className="space-y-3 text-sm">
              <p><strong>2.1 签约主体</strong><br/>
              本协议由您与我们共同缔结，本协议对您与我们均具有合同效力。<strong>本协议项下，轻照AI实际经营者可能根据本服务的业务调整而发生变更，变更后的服务经营者与您共同履行本协议并向您提供服务，服务的变更不会影响您本协议项下的权益。</strong></p>
              
              <p><strong>2.2 补充协议</strong><br/>
              服务规则为本协议的补充协议，与本协议不可分割并具有同等法律效力。</p>
              
              <p><strong>2.3 本协议为统一适用的一般性用户服务条款。</strong><br/>
              针对我们的某些特定服务，我们还将制定特定服务协议，以便更具体地向您阐明该等产品及/或服务的服务内容、服务规则等内容，您应在充分阅读并同意特定服务协议的全部内容后再使用该特定服务。</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">7. 个人信息及未成年保护</h2>
            <div className="space-y-3 text-sm">
              <p><strong>7.1 个人信息保护</strong><br/>
              我们将依法律法规保护您的个人信息，采取合理安全措施防止泄露或违法使用。如有疑问，可参考<Link href="/privacy" className="text-primary underline" data-testid="link-privacy">《隐私政策》</Link>。</p>
              
              <p><strong>7.2 未成年人保护</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li><strong>未满18周岁的用户应在监护人指导和同意下使用本服务。</strong></li>
                <li>我们保护未成年人信息，用户在填写信息时需谨慎。</li>
                <li>提醒区分网络与现实，避免沉迷。</li>
                <li><strong>监护人应指导未成年人注意网络安全，违反条款应依法承担责任。</strong></li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">10. 法律适用、管辖</h2>
            <div className="space-y-3 text-sm">
              <p><strong>10.1 法律适用</strong><br/>
              本协议适用中华人民共和国法律。</p>
              
              <p><strong>10.2 管辖</strong><br/>
              因使用本服务产生的争议，协商不成时，任何一方可向被告所在地人民法院提起诉讼。</p>
              
              <p><strong>10.3 条款有效性</strong><br/>
              本协议任一条款被视为废止、无效或不可执行，不影响其余条款有效性。</p>
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