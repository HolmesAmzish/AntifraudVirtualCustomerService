import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopMenuBar from '../components/TopMenuBar';
export default function Home() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg"></div>
      <TopMenuBar />
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* 标题区 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full p-6">
            <div className="flex items-center justify-center gap-6">
              <img src="/logo.svg" alt="Logo" className="h-24 w-24" />
              <div className="text-left">
                <h1 className="text-5xl font-bold text-gray-900">
                  智能金融反诈骗系统
                </h1>
                <p className="text-xl text-gray-600">
                  由CodeMaker提供的专业金融反欺诈解决方案
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 卡片区 */}
        <div className="flex-[2] flex items-center justify-center">
          <div className="max-w-6xl w-full px-6">
            <div className="flex h-[400px] w-full gap-5">
                {[
                  {
                    name: "智能风险识别引擎",
                    card_description: "本系统搭载基于深度学习的第三代金融风控模型，通过实时分析交易金额、频次、时间、地理位置等200+维度特征，可识别包括冒充公检法、虚假投资、杀猪盘等18类诈骗模式。系统采用动态阈值算法，对异常交易实现毫秒级响应，误报率低于0.3%。与央行反诈平台数据联动，每日更新超过5万条诈骗特征数据，确保识别模型持续进化。特别针对老年人群体优化了语音语义分析模块，可识别电话诈骗中的关键话术特征。"
                  },
                  {
                    name: "全链路风险预警系统", 
                    card_description: "构建用户行为基线模型，通过机器学习分析每个用户的交易习惯、设备指纹、操作轨迹等特征。当检测到偏离基线的异常操作时，系统会触发三级预警机制：首先在APP端弹出智能验证，其次发送生物识别确认请求，最后自动冻结可疑账户。预警准确率达92%，较传统规则引擎提升40%。支持自定义预警阈值，金融机构可根据客户风险承受能力调整防护强度。系统还能模拟诈骗话术对用户进行安全测试，生成个人防骗能力评估报告。"
                  },
                  {
                    name: "多模态智能交互中心",
                    card_description: "集成语音识别（ASR）、自然语言理解（NLU）、语音合成（TTS）三大核心技术，支持方言识别和情感分析。提供7×24小时智能咨询服务，平均响应时间1.2秒，解决率85%。对话系统采用多轮追问策略，能主动发现用户潜在受骗迹象。当识别到高风险对话时自动转接人工专家，转接过程保留完整对话上下文。系统包含200+诈骗场景对话模板，可模拟最新诈骗话术进行用户教育。特别开发了\"防骗情景剧\"功能，通过互动游戏提升老年人防诈意识。"
                  },
                  {
                    name: "反诈知识图谱系统",
                    card_description: "聚合公检法、金融机构、运营商等8类数据源，构建包含300万+节点的反诈知识网络。采用图神经网络技术，可动态追踪诈骗手法变异路径，预测新型诈骗趋势。知识库包含1.2万条法律条款解读、5千个典型案例分析和800+防范技巧，每日自动更新来自全国200+反诈中心的预警信息。支持多维度知识检索，金融机构可快速查询特定诈骗手法的特征、法律适用和处置流程。系统还能生成可视化诈骗手法传播图谱，辅助公安机关开展案件串并分析。"
                  },
                  {
                    name: "沉浸式反诈训练平台",
                    card_description: "基于虚拟现实技术开发了10类诈骗场景模拟系统，包括\"冒充客服退款\"、\"虚假投资理财\"等高发案件。用户可通过角色扮演体验完整诈骗流程，系统会实时解析诈骗话术的心理学原理。训练结束后生成详细评估报告，指出用户的易受骗弱点和改进建议。平台包含200+互动教学案例，采用游戏化设计提升学习趣味性。特别为金融机构员工开发了专业版训练系统，包含客户异常行为识别、话术干预技巧等专项课程，通过率纳入绩效考核体系。"
                  },
                  {
                    name: "资金溯源追踪系统",
                    card_description: "应用区块链技术构建资金流向分析平台，可穿透5层以上转账关系，可视化展示涉案资金转移路径。系统整合了全国银行卡交易数据、第三方支付记录和虚拟货币流向信息，支持多维度关联分析。独创的\"诈骗资金指纹\"技术，能识别同一犯罪团伙控制的多个账户。与公安机关办案系统直连，可自动生成符合司法要求的电子取证报告。追赃效率提升60%，平均缩短案件侦办周期15天。系统还能预测资金转移趋势，指导银行及时冻结关键账户。"
                  },
                  {
                    name: "智能合规管理平台",
                    card_description: "自动化生成金融机构反洗钱/反诈合规报告，覆盖客户尽职调查、交易监测、可疑报告等全流程。系统内置监管规则引擎，可智能识别200+违规情形，自动标注整改建议。支持一键生成报送央行、银保监会的标准化报表，错误率低于0.1%。独创的\"监管沙盒\"测试环境，可模拟新业务场景下的合规风险。每月输出行业风险态势分析，帮助机构优化风控策略。已对接20+省级监管平台，实现风险信息实时共享。系统还能基于历史数据预测监管检查重点，提前做好合规准备。"
                  }
                ].map((card, index) => {
                  const isActive = index === activeCard;
                  return (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 ${
                        isActive ? "flex-[5]" : "flex-1"
                      }`}
                      onClick={() => setActiveCard(index)}
                    >
                      <div className={`relative h-full overflow-hidden rounded-xl transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 opacity-0"
                      }`}>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-5">
                        <div className={`flex flex-col transition-opacity duration-150 ${
                          isActive ? "opacity-0" : "opacity-100"
                        }`}>
                          <h3 className="rotate-180 text-xl font-bold text-blue-900 [writing-mode:vertical-lr]">
                            {card.name}
                          </h3>
                        </div>
                        <div className={`absolute inset-0 flex flex-col justify-center p-5 transition-opacity duration-100 ${
                          isActive ? "opacity-100 delay-300" : "opacity-0"
                        }`}>
                          <h3 className="mb-4 text-2xl font-bold text-blue-900">
                            {card.name}
                          </h3>
                          <p className="text-blue-800">
                            {card.card_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* 按钮区 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="pt-8">
            <button 
              onClick={() => navigate('/chat')}
              className="relative z-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              开始咨询
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
