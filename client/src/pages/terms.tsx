import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  const [, setLocation] = useLocation();

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto px-4 py-6 flex-grow">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">用户服务协议</h1>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          <p className="font-medium text-gray-600 mb-6">
            <strong>修改日期：2025年8月25日　生效日期：2025年9月17日</strong>
          </p>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">提示条款</h2>
          <div className="space-y-4 text-sm">
            <p>欢迎您使用轻照AI！</p>
            <p>
              为使用轻照AI提供的相关服务（以下简称"本服务"），您应当阅读并遵守《用户服务协议》（以下简称"本协议"）。<strong>建议您仔细阅读本协议的全部内容，尤其是以加粗形式展示的，与您的权益（可能）存在重大关系的条款（包括相关约定免除或者限制责任的条款、法律适用和争议解决等条款），请您务必审慎阅读、充分理解各条款内容。</strong>各条款标题仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。
            </p>
            <p>
              <strong>您点击同意或您使用本服务（"使用"行为指包括但不限于下载、安装、启动、浏览、注册、登录等行为中的一种或多种，下同），即表示您已阅读并同意签署本协议所有内容，本协议即在您与轻照AI之间产生法律效力，成为对双方均具有约束力的法律文件。如您不同意轻照AI不时对本协议的修改或补充内容，您应放弃注册、停止使用或主动取消本服务。</strong>
            </p>
            <p>本《用户服务协议》将帮助您了解以下内容：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
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

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">1. 定义</h2>
          <div className="space-y-4 text-sm">
            <p><strong>1.1 我方或我们</strong>：是指轻照AI及其相关服务可能存在的运营关联单位（如存在将在实际提供时向您适时披露），但不包括第三方功能及相关服务的实际提供方。</p>
            <p><strong>1.2 本服务</strong>：向您提供各项产品及/或服务的轻照AI客户端、小程序、H5 页面及随技术发展出现的新形态。</p>
            <p><strong>1.3 服务规则</strong>：包括所有在本服务时已经发布及后续发布的全部规则、解读、公告等内容以及在各频道、活动页面、帮助中心等发布的各类规则、实施细则、产品说明、公告等。</p>
            <p><strong>1.4 用户或您</strong>：接受并同意本协议全部条款及轻照AI发布的其他全部服务条款和操作规则的用户。包括注册用户及未注册用户，凡未注册本服务的用户，自开始使用本服务时即成为我们的"非注册用户"，在使用过程中须遵循本协议中除注册用户专属约定以外的其他所有条款。</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">2. 协议范围</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>2.1 签约主体</strong></h3>
            <p>本协议由您与我们共同缔结，本协议对您与我们均具有合同效力。<strong>本协议项下，轻照AI实际经营者可能根据本服务的业务调整而发生变更，变更后的服务经营者与您共同履行本协议并向您提供服务，服务的变更不会影响您本协议项下的权益。</strong></p>
            
            <h3 className="font-semibold"><strong>2.2 补充协议</strong></h3>
            <p>服务规则为本协议的补充协议，与本协议不可分割并具有同等法律效力。</p>
            
            <h3 className="font-semibold"><strong>2.3 本协议为统一适用的一般性用户服务条款。</strong></h3>
            <p>针对我们的某些特定服务，我们还将制定特定服务协议，以便更具体地向您阐明该等产品及/或服务的服务内容、服务规则等内容，您应在充分阅读并同意特定服务协议的全部内容后再使用该特定服务。</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">3. 账号注册与使用</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>3.1 用户资格</strong></h3>
            <p><strong>您确认，在您开始使用/注册轻照AI服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则应获得监护人的知情同意，您及您的监护人应依照法律规定承担因此而导致的相应的责任。特别地，如果您是未成年人，请在您的监护人的同意和指导下访问和/或使用本服务。</strong></p>
            
            <h3 className="font-semibold"><strong>3.2 账号说明</strong></h3>
            
            <h4 className="font-medium"><strong>3.2.1 账号注册</strong></h4>
            <p>当您按照注册页面提示填写信息或授权第三方账号登录，阅读并同意本协议，您可注册轻照AI账号并成为用户。</p>
            <p>您对于注册的用户名、昵称中所含的全部信息拥有合法的权利。您应确保设定的用户名、昵称中不包含以下内容，否则，平台可将相应用户名、昵称进行删除或屏蔽：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>党和国家领导人的真实姓名、字号、艺名、笔名；</li>
              <li>国家机构的名称；</li>
              <li>不文明、不健康字段，或包含歧视、侮辱、猥亵类词语；</li>
              <li>易产生歧义、引起他人误解或不符合法律规定的；</li>
              <li>盗用他人头像或资料，冒充、利用他人名义的；</li>
              <li>侵害他人肖像权、名誉权、版权、商标权、商业秘密或其他专属权利；</li>
              <li>强制性、诱导性、欺骗性信息、违规交易信息；</li>
              <li>中国法律、法规、规章以及任何具有法律效力之规范所限制或禁止使用的其他信息；</li>
              <li>有可能损害平台和其他用户利益的其他信息。</li>
            </ol>
            
            <h4 className="font-medium"><strong>3.2.2 账号使用</strong></h4>
            <p>您有权授权第三方账号或者使用您的手机号码等方式登录轻照AI。由于您的账号关联您的个人信息及服务商业信息，您的账号仅限您本人使用。您确认并同意确保账户密码的机密安全是您的责任。<strong>未经平台同意或依据法律规定，不得向第三方转让、赠与账号、借予第三方使用或以其他方式处分账号。</strong>通过注册账号所从事的一切行为，将被认定为您本人的行为。您应当就该等行为承担全部责任。如轻照AI根据服务规则判断账号使用可能危及账号安全或服务信息安全，我们有权暂停或停止提供相应服务。</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">4. 本服务及规则</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>4.1 本服务</strong></h3>
            
            <h4 className="font-medium"><strong>4.1.1 服务范围</strong></h4>
            <p>根据您选择的功能不同，我们可能提供不同的服务。您可能上传照片用于AI生成，系统将通过技术生成新的内容。"您的上传内容"与"AI生成内容"，统称为"您的内容"。同时，我们还提供内容分享、传播及获取等信息交流服务，具体以页面实际展示为准。</p>
            
            <h4 className="font-medium"><strong>4.1.2 服务费用</strong></h4>
            <p>本服务目前仅针对个人用户，AI生成服务为收费服务，采用先收费后服务的方式。<strong>您支付的费用是购买服务所对应的网络服务对价，而非预付款或定金。</strong>一经使用服务后不可转让或退款（如因服务存在重大瑕疵导致无法使用等情况或法律法规要求必须退款除外）。<strong>服务收费标准由平台根据运营成本和策略决定，并在支付页面展示。</strong></p>
            
            <h4 className="font-medium"><strong>4.1.3 广告和商业信息</strong></h4>
            <p>您知悉并同意，我们在提供服务过程中保留投放商业性广告或其他商业信息的权利。</p>
            
            <h3 className="font-semibold"><strong>4.2 服务规则</strong></h3>
            
            <h4 className="font-medium"><strong>4.2.1 行为规范</strong></h4>
            <p><strong>您理解并保证您的内容及账号信息应当遵守宪法、法律和行政法规，您应对内容的真实性、合法性负责。</strong>如需获得权利人或有权第三方授权，须在获得授权后方可使用、制作或发布。</p>
            <p>禁止直接或间接使用轻照AI生成、获取、传播或帮助他人生成、获取、传播如下信息或内容：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>反对宪法确定的基本原则；</li>
              <li>危害国家统一、主权和领土完整；</li>
              <li>泄露国家秘密、危害国家安全或损害国家荣誉和利益；</li>
              <li>煽动民族仇恨、民族歧视，破坏民族团结；</li>
              <li>宣扬邪教、迷信；</li>
              <li>扰乱社会秩序，破坏社会稳定；</li>
              <li>传播虚假信息；</li>
              <li>宣扬恐怖主义、极端主义；</li>
              <li>诱导违法犯罪、渲染暴力、色情、赌博；</li>
              <li>侮辱或诽谤他人，侵害合法权益；</li>
              <li>危害社会公德，损害民族文化传统；</li>
              <li>其他违反法律法规或干扰正常运营及侵犯第三方合法权益的行为。</li>
            </ol>
            
            <p><strong>若您违反本协议，我们有权自主决定并可在不预先通知的情况下：</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>暂停或终止软件使用许可并停止相应技术服务；</li>
              <li>将涉及违规内容进行屏蔽或下线；</li>
              <li>立即停止生成或传输该信息，采取消除等处置措施，保存记录并向主管部门报告；</li>
              <li>诉诸行政执法或司法机关追究法律责任。<strong>因您违规导致任何第三方损害，您应独立承担责任。</strong></li>
            </ol>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">5. 人工智能生成合成内容的标识规则</h2>
          <div className="space-y-4 text-sm">
            <p><strong>为遵守法律法规与国家标准要求，提升AI生成内容透明度，保障公众知情权及内容溯源，我们对利用AI技术生成或合成的内容实施标识管理。</strong></p>
            
            <h3 className="font-semibold"><strong>5.1 默认标识规则</strong></h3>
            <p>平台将自动为所有AI生成或合成内容添加显式标识和隐式标识。</p>
            
            <h4 className="font-medium"><strong>5.1.1 显式标识</strong></h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>图片/视频：在显著位置添加"AI生成"文字水印；</li>
              <li>交互对话：界面中明确展示"AI生成"的提示。</li>
            </ul>
            
            <h4 className="font-medium"><strong>5.1.2 隐式标识</strong></h4>
            <p>在内容文件元数据中嵌入不可明显感知的标识，用于技术溯源与管理。</p>
            
            <h3 className="font-semibold"><strong>5.2 用户义务</strong></h3>
            <p>您承诺不得移除、遮挡、篡改或规避显式或隐式标识。违反可能承担法律责任。</p>
            
            <h3 className="font-semibold"><strong>5.3 申请移除显式标识的特殊约定</strong></h3>
            <p>在合法场景下，您可申请不含显式标识内容，但需遵守以下约定：</p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>责任承担：您对使用行为承担全部法律责任，并确保必要标识添加；</li>
              <li>使用限制：不得误导公众或侵犯他人合法权益。</li>
            </ol>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">6. 知识产权</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>6.1 我方知识产权</strong></h3>
            <p>除非另有约定或声明，本服务所使用的内容、技术、软件、程序、数据、Logo及其他标识、产品和服务名称的知识产权归轻照AI所有。未经许可，不得擅自使用。</p>
            
            <h3 className="font-semibold"><strong>6.2 您的权利</strong></h3>
            <p><strong>除法律另有规定或双方另有约定，您在使用本服务时生成内容及发布内容的权利归您所有。</strong>您保证对上传内容拥有合法权利或授权，系统完成处理后自动删除上传信息，不用于识别用途。</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">7. 个人信息及未成年保护</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>7.1 个人信息保护</strong></h3>
            <p>我们将依法律法规保护您的个人信息，采取合理安全措施防止泄露或违法使用。如有疑问，可参考<Link href="/privacy" className="text-primary underline" data-testid="link-privacy">《隐私政策》</Link>。</p>
            
            <h3 className="font-semibold"><strong>7.2 未成年人保护</strong></h3>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li><strong>未满18周岁的用户应在监护人指导和同意下使用本服务。</strong></li>
              <li>我们保护未成年人信息，用户在填写信息时需谨慎。</li>
              <li>提醒区分网络与现实，避免沉迷。</li>
              <li><strong>监护人应指导未成年人注意网络安全，违反条款应依法承担责任。</strong></li>
            </ol>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">8. 责任的限制和免除</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>8.1 不可抗力</strong></h3>
            <p>本服务按"现状"和"可得到"状态提供。因网络、设备、黑客、电力故障、罢工、自然灾害、政府行为等造成损害，我们不承担法律规定之外的责任。</p>
            
            <h3 className="font-semibold"><strong>8.2 免责声明</strong></h3>
            <p>您知悉所有AI生成内容仅供参考，不代表轻照AI观点。<strong>您需自行判断使用内容的风险，不得依赖其进行医疗、法律、金融等专业决策。</strong></p>
            
            <h3 className="font-semibold"><strong>8.3 域外行为</strong></h3>
            <p>本服务由中华人民共和国境内设施提供，不保证在其他地区适用，用户应确保遵守当地法律。</p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">9. 协议的变更</h2>
          <div className="space-y-4 text-sm">
            <p>我们可能更新本协议并通过公告或系统消息提醒您。<strong>如不同意变更，应停止使用服务；继续使用视为同意变更。</strong></p>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">10. 法律适用、管辖</h2>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold"><strong>10.1 法律适用</strong></h3>
            <p>本协议适用中华人民共和国法律。</p>
            
            <h3 className="font-semibold"><strong>10.2 管辖</strong></h3>
            <p>因使用本服务产生的争议，协商不成时，任何一方可向被告所在地人民法院提起诉讼。</p>
            
            <h3 className="font-semibold"><strong>10.3 条款有效性</strong></h3>
            <p>本协议任一条款被视为废止、无效或不可执行，不影响其余条款有效性。</p>
          </div>
        </div>

      </div>
      
      {/* Footer at page bottom */}
      <div 
        className="text-center bg-background mt-auto mb-6 pt-4"
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