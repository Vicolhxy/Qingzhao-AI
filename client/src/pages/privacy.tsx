import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-4 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">隐私政策</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 prose prose-sm max-w-none">
        <div className="markdown-content">
          <h1 className="text-xl font-bold mb-4">隐私政策</h1>
          
          <p className="text-sm text-gray-600 mb-6">
            <strong>生效日期：2025年9月17日</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">引言</h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>欢迎使用轻照AI产品及服务！我们深知您的个人信息和隐私的重要性，因此致力于采取合理的技术与管理措施保护您的信息安全。轻照AI服务提供者（以下简称"<strong>我们</strong>"）制定本《轻照AI隐私政策》（以下简称"<strong>本政策</strong>"），以便您了解我们在产品及服务中如何收集、使用、共享、存储和保护个人信息，以及您可以如何管理这些信息。</p>
              
              <p>请您在使用我们的产品或服务前，仔细阅读并充分理解本政策。特别注意本政策中以<strong>粗体</strong>标注的条款。<strong>除本政策外，我们可能在特定场景通过弹窗或提示告知您信息收集目的、范围及使用方式，这些告知和说明与本政策具有同等效力。</strong></p>
              
              <p>您同意隐私政策即表示您已理解轻照AI提供的功能及其所需的必要信息授权，但这不意味着您默认同意开启附加功能或处理非必要信息，相关权限会单独征得您的同意。</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">一、适用范围</h2>
            <p className="text-sm leading-relaxed">
              本政策适用于轻照AI通过网页、客户端、小程序及未来新形态提供的所有产品和服务。若特定产品或服务另有隐私政策，则应以其政策为准。本政策不适用于第三方服务，第三方服务的隐私规则由其独立制定。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">二、信息收集及使用</h2>
            <div className="space-y-4 text-sm">
              <p>我们收集信息主要用于以下两类：</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>必要信息</strong>：为实现基本功能及履行法律义务必须收集的信息。如您拒绝提供，可能无法正常使用相关功能。</li>
                <li><strong>附加信息</strong>：为实现额外功能（如快速识别上传图片的规范性），需单独同意收集。拒绝提供不会影响基本功能使用，但无法享受附加功能。</li>
              </ol>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">（一）账号注册与登录</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>手机号码</strong>：用于注册、登录及验证身份。</li>
                  <li><strong>第三方登录</strong>：授权轻照AI获取必要信息绑定账号（例如微信登录时获取手机号），确保满足实名制要求。</li>
                </ul>
                <p className="mt-2 text-xs text-gray-600">说明：若不提供上述信息，将无法完成注册或登录。</p>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">（二）浏览、生成与分享照片</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>我们收集<strong>设备信息和日志信息</strong>（操作记录、生成、下载、分享记录及访问时间），以保证功能正常。</li>
                  <li>用户上传的原始肖像仅用于AI生成服务，<strong>不会存储、转播或用于识别用户身份</strong>。生成任务完成后，系统自动删除原始信息。</li>
                  <li>分享功能可能读取剪贴板内容以识别分享指令，<strong>不会收集剪贴板的其他信息</strong>。</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">七、未成年人保护</h2>
            <div className="space-y-3 text-sm">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>14周岁以下儿童需监护人同意使用服务。</li>
                <li>我们制定了<Link href="/children-protection" className="text-primary underline" data-testid="link-children-protection">儿童个人信息保护规则</Link>，确保在监护人指导下使用。</li>
                <li>监护人可联系个人信息保护负责人监督儿童信息使用。</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">八、联系我们</h2>
            <p className="text-sm">
              在线客服或发送邮件至 <strong>info@swifto.com</strong>。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">附录：相关定义</h2>
            <div className="space-y-2 text-sm">
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>轻照AI</strong>：指轻照AI小程序及相关产品与服务。</li>
                <li><strong>个人信息</strong>：可识别自然人的信息，不包括匿名化数据。</li>
                <li><strong>敏感信息</strong>：生物识别、身份、健康、财务等信息，以及未满14周岁儿童信息。</li>
                <li><strong>儿童</strong>：未满14周岁的自然人。</li>
                <li><strong>设备信息</strong>：设备标识符、应用信息、系统参数及网络环境信息。</li>
                <li><strong>服务日志信息</strong>：搜索、浏览记录、IP、网络信息及使用语言。</li>
                <li><strong>去标识化/匿名化</strong>：处理后无法识别特定自然人，且匿名化不可复原。</li>
              </ul>
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