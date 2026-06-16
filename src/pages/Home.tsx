import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    distributorType: '',
    hasAccount: '',
    accountPhone: '',
    name: '',
    phone: '',
    companyName: '',
    message: ''
  });
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);
  const [isPartnerSubmitted, setIsPartnerSubmitted] = useState(false);

  const handlePartnerFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnerFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPartnerSubmitting(true);
    setTimeout(() => {
      setIsPartnerSubmitting(false);
      setIsPartnerSubmitted(true);
    }, 1500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
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
              度支云智慧报销系统
              <br />
              <span style={{ 
                color: '#3b82f6'
              }}>
                报销有度支，算账更省心
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
                }} onClick={() => setShowModal(true)}>
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
                <span>免费试用14天</span>
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
              我们的度支云智慧报销系统集成了多项智能化功能，全方位满足企业报销需求
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
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
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
                backgroundColor: '#fafafa',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  right: '24px',
                  transition: 'opacity 0.4s ease-in-out, transform 0.3s ease-out',
                  opacity: activeTab === 0 ? 1 : 0,
                  transform: activeTab === 0 ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.99)',
                  pointerEvents: activeTab === 0 ? 'auto' : 'none'
                }}>
                  {/* Tab 1: 发票上传识别 */}
                    <>
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            您好！我是AI报销助手，您可以发送发票照片或PDF给我，我会帮您识别发票信息。
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <div style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          borderRadius: '14px',
                          borderTopRightRadius: '4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            <span style={{ display: 'block', marginBottom: '8px', fontSize: '12px', opacity: 0.8 }}>📎 上传了发票图片</span>
                            帮我识别这张发票
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            ✅ 发票识别完成！<br/>
                            <strong>发票类型：</strong>增值税普通发票<br/>
                            <strong>金额：</strong>¥128.50<br/>
                            <strong>开票日期：</strong>2024-01-15<br/>
                            <strong>发票代码：</strong>110023456789<br/>
                            <strong>发票号码：</strong>01234567
                          </p>
                        </div>
                      </div>
                    </>
                </div>
                
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  right: '24px',
                  transition: 'opacity 0.4s ease-in-out, transform 0.3s ease-out',
                  opacity: activeTab === 1 ? 1 : 0,
                  transform: activeTab === 1 ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.99)',
                  pointerEvents: activeTab === 1 ? 'auto' : 'none'
                }}>
                  {/* Tab 2: 报销单创建提交 */}
                    <>
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            已识别到发票信息，是否帮您创建报销单？
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <div style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          borderRadius: '14px',
                          borderTopRightRadius: '4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            好的，创建报销单，费用类型选餐饮
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            📝 报销单已创建！<br/>
                            <strong>报销单号：</strong>EXP-20240115-001<br/>
                            <strong>金额：</strong>¥128.50<br/>
                            <strong>费用类型：</strong>餐饮<br/>
                            <strong>状态：</strong>待提交
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end' }}>
                        <div style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          borderRadius: '14px',
                          borderTopRightRadius: '4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            提交报销单
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
                    </>
                </div>
                
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  right: '24px',
                  transition: 'opacity 0.4s ease-in-out, transform 0.3s ease-out',
                  opacity: activeTab === 2 ? 1 : 0,
                  transform: activeTab === 2 ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.99)',
                  pointerEvents: activeTab === 2 ? 'auto' : 'none'
                }}>
                  {/* Tab 3: 审批提醒回复 */}
                    <>
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            🔔 提醒：您有 <strong>2</strong> 条待审批报销单需要处理
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <div style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          borderRadius: '14px',
                          borderTopRightRadius: '4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            查看待审批列表
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            <strong>待审批报销单：</strong><br/>
                            1️⃣ EXP-20240115-001 | 张三 | ¥128.50 | 餐饮<br/>
                            2️⃣ EXP-20240114-023 | 李四 | ¥890.00 | 差旅
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <div style={{
                          padding: '14px 18px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                          borderRadius: '14px',
                          borderTopRightRadius: '4px',
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)'
                        }}>
                          <p style={{ color: 'white', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            全部通过审批
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
                          maxWidth: '70%',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}>
                          <p style={{ color: '#374151', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                            ✅ 审批已完成！<br/>
                            两条报销单均已通过审批，已通知申请人。
                          </p>
                        </div>
                      </div>
                    </>
                </div>
              </div>
              
              {/* 输入区域 */}
              <div style={{ padding: '14px 16px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button 
                    style={{
                      padding: '8px',
                      color: '#d1d5db',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'not-allowed',
                      fontSize: '16px'
                    }}
                    disabled
                  >
                    📎
                  </button>
                  <input
                    type="text"
                    placeholder="演示模式，暂不可输入..."
                    disabled
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f3f4f6',
                      color: '#9ca3af',
                      cursor: 'not-allowed'
                    }}
                  />
                  <button 
                    style={{
                      background: '#e5e7eb',
                      color: '#9ca3af',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      cursor: 'not-allowed',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    disabled
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tab标签 - 移到聊天窗口下方 */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '20px',
              padding: '12px 16px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              {['发票上传识别', '报销单创建提交', '审批提醒回复'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '10px 20px',
                    background: activeTab === index ? 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeTab === index ? '600' : '400',
                    color: activeTab === index ? 'white' : '#6b7280',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: activeTab === index ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                >
                  {tab}
                </button>
              ))}
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
              加入度支云体验AI驱动的智能报销系统，让报销流程更简单、更高效。
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
              }} onClick={() => setShowModal(true)}>
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
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=duzhiyun%20cloud%20logo%20blue%20gradient%20minimalist%20clean%20white%20background&image_size=square" 
                  alt="度支云智慧报销系统"
                  style={{ width: '36px', height: '36px', objectFit: 'contain', backgroundColor: 'white', padding: '2px', borderRadius: '8px' }}
                />
                <span style={{ fontSize: '20px', fontWeight: '700' }}>度支云智慧报销系统</span>
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
              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>帮助</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="/help/getting-started" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>入门指引</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/help/manual" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>操作手册</a></li>
                <li style={{ marginBottom: '10px' }}><a href="/help/api" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>API文档</a></li>
                <li style={{ marginBottom: '10px' }}><a  style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }} onClick={() => setShowPartnerModal(true)}>成为分销商</a></li>

              </ul>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>联系我们</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20man%20headshot%20portrait%20formal%20ID%20photo%20clean%20background&image_size=portrait_4_3" 
                  alt="联系人"
                  style={{ width: '48px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #374151' }}
                />
                <div>
                  <p style={{ color: 'white', fontWeight: '500' }}>苏恒</p>
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>四川恒信赛威科技有限公司</p>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>电话：028-64269361</li>
              </ul>

            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>© 2026 四川恒信赛威科技有限公司，保留所有权利</p>
            <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '4px' }}>蜀ICP备2023020652号-1</p>
          </div>
        </div>
      </footer>

      {/* 预约产品演示弹窗 */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#6b7280'
            }} onClick={() => setShowModal(false)}>
              ×
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '28px'
              }}>
                📅
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
                预约产品演示
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                填写以下信息，我们的专业顾问将在24小时内与您联系
              </p>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
               <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  公司名称<span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入您的公司名称"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  姓名 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  手机号 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="tel"
                  placeholder="请输入您的手机号"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>
              
             
              
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                  alert('感谢您的预约，我们将尽快与您联系！');
                }}
              >
                提交预约
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 成为分销商弹窗 */}
      {showPartnerModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }} onClick={() => setShowPartnerModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#6b7280'
            }} onClick={() => { setShowPartnerModal(false); setIsPartnerSubmitted(false); }}>
              ×
            </button>

            {isPartnerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <span style={{ fontSize: '48px' }}>✓</span>
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
                  提交成功！
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>
                  感谢您申请成为度支云智慧报销系统分销商，我们的工作人员将在1-3个工作日内与您联系。
                </p>
                <button style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => { setShowPartnerModal(false); setIsPartnerSubmitted(false); }}>
                  确定
                </button>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '28px'
                  }}>
                    🤝
                  </div>

                  <p style={{ color: '#6b7280', fontSize: '14px' }}>
                    加入度支云智慧报销系统分销计划，共同开拓企业报销市场
                  </p>
                </div>

                <form onSubmit={handlePartnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* 分销主体 */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      分销主体<span style={{ color: '#ef4444' }}>*</span>
                    </h4>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasAccount"
                          value="yes"
                          checked={partnerFormData.hasAccount === 'yes'}
                          onChange={handlePartnerFormChange}
                          required
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '15px', color: '#374151' }}>个人</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasAccount"
                          value="no"
                          checked={partnerFormData.hasAccount === 'no'}
                          onChange={handlePartnerFormChange}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '15px', color: '#374151' }}>公司</span>
                      </label>
                    </div>
                    {partnerFormData.hasAccount === 'yes' && (
                      <div style={{ marginTop: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          系统账号手机号 <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          name="accountPhone"
                          value={partnerFormData.accountPhone}
                          onChange={handlePartnerFormChange}
                          required={partnerFormData.hasAccount === 'yes'}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          placeholder="请输入系统账号手机号"
                        />
                      </div>
                    )}
                  </div>

                  {/* 联系人信息 */}
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                      联系人信息 <span style={{ color: '#ef4444' }}>*</span>
                    </h4>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        姓名 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={partnerFormData.name}
                        onChange={handlePartnerFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="请输入姓名"
                      />
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        联系电话 <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={partnerFormData.phone}
                        onChange={handlePartnerFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  {/* 公司信息 */}
                  {partnerFormData.distributorType === 'company' && (
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                        公司信息
                      </h4>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                          公司名称 <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={partnerFormData.companyName}
                          onChange={handlePartnerFormChange}
                          required={partnerFormData.distributorType === 'company'}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1px solid #e5e7eb',
                            borderRadius: '10px',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          placeholder="请输入公司名称"
                        />
                      </div>
                    </div>
                  )}

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={isPartnerSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: isPartnerSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {isPartnerSubmitting ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ width: '18px', height: '18px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        提交中...
                      </span>
                    ) : (
                      '提交申请'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;