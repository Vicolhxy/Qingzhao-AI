import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  const [, setLocation] = useLocation();

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">隐私政策</h1>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          <p className="font-medium text-gray-600 mb-6">
            <strong>生效日期：2025年9月17日</strong>
          </p>

          <h2 className="text-xl font-bold mb-4">引言</h2>
          <div className="space-y-4 text-sm">
            <p>
              欢迎使用轻照AI产品及服务！我们深知您的个人信息和隐私的重要性，因此致力于采取合理的技术与管理措施保护您的信息安全。轻照AI服务提供者（以下简称"<strong>我们</strong>"）制定本《轻照AI隐私政策》（以下简称"<strong>本政策</strong>"），以便您了解我们在产品及服务中如何收集、使用、共享、存储和保护个人信息，以及您可以如何管理这些信息。
            </p>
            <p>
              请您在使用我们的产品或服务前，仔细阅读并充分理解本政策。特别注意本政策中以<strong>粗体</strong>标注的条款。<strong>除本政策外，我们可能在特定场景通过弹窗或提示告知您信息收集目的、范围及使用方式，这些告知和说明与本政策具有同等效力。</strong>
            </p>
            <p>
              您同意隐私政策即表示您已理解轻照AI提供的功能及其所需的必要信息授权，但这不意味着您默认同意开启附加功能或处理非必要信息，相关权限会单独征得您的同意。
            </p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">一、适用范围</h2>
          <div className="space-y-4 text-sm">
            <p>
              本政策适用于轻照AI通过网页、客户端、小程序及未来新形态提供的所有产品和服务。若特定产品或服务另有隐私政策，则应以其政策为准。本政策不适用于第三方服务，第三方服务的隐私规则由其独立制定。
            </p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">二、信息收集及使用</h2>
          <div className="space-y-4 text-sm">
            <p>我们收集信息主要用于以下两类：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li><strong>必要信息</strong>：为实现基本功能及履行法律义务必须收集的信息。如您拒绝提供，可能无法正常使用相关功能。</li>
              <li><strong>附加信息</strong>：为实现额外功能（如快速识别上传图片的规范性），需单独同意收集。拒绝提供不会影响基本功能使用，但无法享受附加功能。</li>
            </ol>

            <h3 className="font-semibold mt-6 mb-3">（一）账号注册与登录</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>手机号码</strong>：用于注册、登录及验证身份。</li>
              <li><strong>第三方登录</strong>：授权轻照AI获取必要信息绑定账号（例如微信登录时获取手机号），确保满足实名制要求。</li>
            </ul>
            <div className="bg-gray-50 p-3 rounded text-sm italic">
              <p>说明：若不提供上述信息，将无法完成注册或登录。</p>
            </div>

            <h3 className="font-semibold mt-6 mb-3">（二）浏览、生成与分享照片</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>我们收集<strong>设备信息和日志信息</strong>（操作记录、生成、下载、分享记录及访问时间），以保证功能正常。</li>
              <li>用户上传的原始肖像仅用于AI生成服务，<strong>不会存储、转播或用于识别用户身份</strong>。生成任务完成后，系统自动删除原始信息。</li>
              <li>分享功能可能读取剪贴板内容以识别分享指令，<strong>不会收集剪贴板的其他信息</strong>。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（三）消息与通知</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>为确保推送通知（如活动提醒、安全验证）正常运行，我们可能使用系统自启或联系方式。</li>
              <li>您可在设备设置中管理通知权限。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（四）下单与支付</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>收集交易相关信息（交易金额、时间、订单号、支付方式等）用于完成交易及提供客户服务。</li>
              <li>拒绝提供将无法完成交易或享受付费服务。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（五）客服与争议处理</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>为核实身份、处理问题或争议，我们可能收集沟通记录、账号信息及相关证明材料。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（六）安全保障</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>为保障账号和交易安全，我们可能收集设备标识符（IMEI、IDFA、AndroidID、MAC等）、硬件信息、传感器信息及服务日志，用于风险识别与防范安全事件。</li>
              <li>收集的设备信息仅用于安全防护和风险评估，不用于其他用途。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（七）附加功能与权限</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>系统权限：部分功能需获取相机、相册等权限。关闭权限不会影响基本功能，但相应功能不可用。</li>
              <li>Cookie及同类技术：用于安全运行和提升体验，不会用于隐私政策外的用途。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（八）其他说明</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>用户提供的他人信息必须合法授权。</li>
              <li>未经用户同意，不会将收集的信息用于本政策未载明的其他用途。</li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">三、数据使用及合作方</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">（一）合作方原则</h3>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li><strong>合法正当与最小必要</strong>：仅在合法、必要范围内处理信息。</li>
              <li><strong>用户知情权</strong>：确保用户了解信息用途。</li>
              <li><strong>安全保障</strong>：评估合作方的安全能力并签署严格协议。</li>
            </ol>

            <h3 className="font-semibold mt-6 mb-3">（二）合作方范围</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>包括我们的关联方及第三方，协助提供技术、统计、客服等服务。</li>
              <li>委托处理：合作方仅限授权范围，不得用于其他用途。</li>
              <li>共同处理：签署协议明确权利与义务。</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">（三）信息转移与公开</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>在公司合并、分立、解散或破产时，我们会告知接收方，继续履行本政策。</li>
              <li>公开披露仅在法律要求、保护安全或您主动选择的情况下进行。</li>
              <li>停止运营时，我们会删除或匿名化处理个人信息。</li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">四、您的权利</h2>
          <div className="space-y-4 text-sm">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>查阅、更正、补充、复制、删除</strong>：您可通过客服申请。</li>
              <li><strong>改变授权范围</strong>：部分必要信息无法撤回。</li>
              <li><strong>注销账号</strong>：可通过客户端、小程序或客服申请注销。</li>
              <li>我们将<strong>在合理范围内免费响应请求</strong>，超出合理次数可能收取适当费用。</li>
            </ul>
            <div className="bg-gray-50 p-3 rounded text-sm italic">
              <p>注意：删除信息可能无法立即清除备份，但会限制进一步处理，确保安全。</p>
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">五、信息存储</h2>
          <div className="space-y-4 text-sm">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>存储期限</strong>：仅保留达成目的所需时间，超期删除或匿名化。</li>
              <li><strong>存储位置</strong>：中国境内服务器。未经单独同意，不会向境外提供信息。</li>
              <li><strong>安全措施</strong>：
                <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
                  <li>技术保护：加密、HTTPS、访问控制；</li>
                  <li>管理措施：专职部门、培训、制度；</li>
                  <li>安全事件应急：及时通知、补救和公告；</li>
                  <li>账号安全：用户妥善保管信息，发现异常立即联系客户。</li>
                </ul>
              </li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">六、政策更新</h2>
          <div className="space-y-4 text-sm">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>我们可能会更新隐私政策以优化服务或业务流程。</li>
              <li><strong>重大变更</strong>会提供显著通知，如业务模式变化、信息共享对象变更等。</li>
              <li>历史版本会存档供查询。</li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">七、未成年人保护</h2>
          <div className="space-y-4 text-sm">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>14周岁以下儿童需监护人同意使用服务。</li>
              <li>我们制定了<Link href="/children-protection" className="text-primary underline" data-testid="link-children-protection">儿童个人信息保护规则</Link>，确保在监护人指导下使用。</li>
              <li>监护人可联系个人信息保护负责人监督儿童信息使用。</li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">八、联系我们</h2>
          <div className="space-y-4 text-sm">
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>在线客服或发送邮件至 <strong>info@swifto.com</strong>。</li>
            </ul>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">附录：相关定义</h2>
          <div className="space-y-4 text-sm">
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
        </div>

      </div>
      
      {/* Footer at page bottom */}
      <div 
        className="text-center bg-background" 
        style={{ marginBottom: '24px', paddingTop: '16px' }}
        data-testid="footer"
      >
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Link 
            href="/terms" 
            className="hover:text-primary transition-colors"
            data-testid="link-terms"
          >
            用户服务协议
          </Link>
          <span>|</span>
          <Link 
            href="/privacy" 
            className="hover:text-primary transition-colors"
            data-testid="link-privacy"
          >
            隐私政策
          </Link>
        </div>
      </div>
    </div>
  );
}