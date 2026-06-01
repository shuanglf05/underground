
import Navbar from '../components/Navbar';

function Home() {
  const features = [
    {
      icon: '🤖',
      title: 'AI对话报销',
      description: '使用自然语言与AI对话，轻松完成报销流程，无需学习复杂操作。'
    },
    {
      icon: '🔗',
      title: '灵活嵌入',
      description: '无缝接入企业微信、钉钉、飞书等协同办公平台，开箱即用。'
    },
    {
      icon: '✅',
      title: '验真验重',
      description: '自动验证发票真伪，智能检测重复报销，降低财务风险。'
    },
    {
      icon: '📷',
      title: '快速识别',
      description: 'OCR智能识别发票信息，自动填写报销单，准确率达99%。'
    },
    {
      icon: '⚡',
      title: '实时审批',
      description: '支持多级审批流程，移动端随时处理，大幅缩短报销周期。'
    },
    {
      icon: '📊',
      title: '数据分析',
      description: '多维度费用分析报表，帮助企业优化成本管理。'
    }
  ];

  const platforms = [
    {
      name: '企业微信',
      description: '深度集成企业微信，消息推送、审批同步',
      color: '#07c160',
      icon: '💬'
    },
    {
      name: '钉钉',
      description: '无缝对接钉钉，自动同步组织架构',
      color: '#2788ff',
      icon: '📘'
    },
    {
      name: '飞书',
      description: '完美适配飞书生态，数据互通无忧',
      color: '#00b4aa',
      icon: '💙'
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar />

      {/* 英雄区 */}
      <section style={{ 
        paddingTop: '120px', 
        paddingBottom: '100px', 
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '28px', 
              lineHeight: '1.2'
            }}>
              赛威报销
              <br />
              <span style={{ 
                color: '#3b82f6'
              }}>
                让报销更简单
              </span>
            </h1>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#6b7280', 
              marginBottom: '40px', 
              maxWidth: '600px', 
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.7'
            }}>
              用自然语言对话完成报销，支持发票验真验重，无缝集成企业微信、钉钉、飞书，让报销流程更智能、更高效。
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  padding: '16px 36px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  立即免费试用 →
                </button>
                <button style={{
                  border: '2px solid #e5e7eb',
                  color: '#374151',
                  padding: '16px 36px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}>
                  预约产品演示
                </button>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#6b7280',
                fontSize: '13px'
              }}>
                <span style={{ fontSize: '14px' }}>🚀</span>
                <span>免费试用14天，无需信用卡</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', color: '#6b7280', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                </span>
                <span>智能发票验真</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                </span>
                <span>自动重复检测</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                </span>
                <span>多平台集成</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能展示 */}
      <section id="features" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              强大功能，让报销更高效
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              我们的AI报销系统集成了多项智能化功能，全方位满足企业报销需求
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '14px' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 集成平台展示 */}
      <section id="integrations" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              无缝集成您的办公平台
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              支持多种主流协同办公平台，让报销融入您的日常工作流
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '64px' }}>
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: platform.color + '15',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '32px'
                }}>
                  {platform.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '10px' }}>
                  {platform.name}
                </h3>
                <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '14px' }}>
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* 数据统计 */}
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '16px',
            padding: '48px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>500+</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>企业用户信赖</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>99.9%</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>系统可用率</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>10万+</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>月处理报销单</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>99%</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>发票识别准确率</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI对话演示 */}
      <section id="demo" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              体验AI报销助手
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              与AI进行真实对话，感受智能报销的便捷
            </p>
          </div>
          
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              {/* 聊天头部 */}
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '20px' }}>🤖</span>
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>AI报销助手</div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>在线 · 随时为您服务</div>
                </div>
              </div>
              
              {/* 聊天消息区域 */}
              <div style={{
                height: '400px',
                overflowY: 'auto',
                padding: '24px',
                backgroundColor: '#fafafa'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>🤖</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    borderTopLeftRadius: '4px',
                    maxWidth: '70%'
                  }}>
                    <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                      您好！我是AI报销助手，有什么可以帮您的吗？
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                  <div style={{
                    padding: '14px 18px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '14px',
                    borderTopRightRadius: '4px',
                    maxWidth: '70%'
                  }}>
                    <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                      我要报销今天的午餐费用
                    </p>
                  </div>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: '#6b7280', fontSize: '16px' }}>👤</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>🤖</span>
                  </div>
                  <div style={{
                    padding: '14px 18px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    borderTopLeftRadius: '4px',
                    maxWidth: '70%'
                  }}>
                    <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                      好的，请告诉我金额和消费时间，我帮您创建报销单。
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 输入区域 */}
              <div style={{ padding: '14px 16px', backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button style={{
                    padding: '8px',
                    color: '#9ca3af',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}>
                    📎
                  </button>
                  <input
                    type="text"
                    placeholder="输入您的问题..."
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    发送
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#1f2937' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white', marginBottom: '16px', lineHeight: '1.2' }}>
              准备好提升您的报销效率了吗？
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#d1d5db', marginBottom: '40px', lineHeight: '1.6' }}>
              加入数千家企业，体验AI驱动的智能报销系统，让报销流程更简单、更高效
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button style={{
                backgroundColor: 'white',
                color: '#1f2937',
                padding: '16px 36px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}>
                免费试用14天 →
              </button>
              <button style={{
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '16px 36px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: 'transparent',
                cursor: 'pointer'
              }}>
                预约产品演示
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>AI</span>
                </div>
                <span style={{ fontSize: '20px', fontWeight: '700' }}>赛威报销</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
                智能AI对话报销系统，让报销更简单、更高效。
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>产品</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>首页</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/pricing" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>定价方案</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/partner" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>成为分销商</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>帮助</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="/help/getting-started" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>入门指引</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/help/manual" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>操作手册</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/help/api" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>API文档</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>联系我们</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>邮箱：contact@ai-expense.com</li>
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>电话：400-888-8888</li>
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>地址：北京市朝阳区科技园区</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>© 2024 赛威报销. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;