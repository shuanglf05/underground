import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [addOns, setAddOns] = useState({
    ai: { quantity: 0, pricePerUnit: 50, unit: '/人/年' },
    verify: { quantity: 0, pricePerUnit: 8, unit: '/1000次' }
  });

  const plans = [
    {
      id: 'free',
      name: '免费版',
      price: 0,
      period: '',
      description: '适合个人或小型团队体验',
      features: [
        '3个用户账号',
        '基础报销功能',
        '邮件通知',
        '基础报表'
      ],
      highlighted: false
    },
    {
      id: 'basic',
      name: '基础版',
      price: 988,
      period: '/年',
      description: '适合中小型企业日常使用',
      features: [
        '20个用户账号',
        'AI智能报销',
        '发票验真验重',
        '多级审批流程',
        '移动端支持',
        '自定义报表'
      ],
      highlighted: false
    },
    {
      id: 'pro',
      name: '升级版',
      price: 1988,
      period: '/年',
      description: '适合成长型企业需求',
      features: [
        '50个用户账号',
        '全部基础版功能',
        '高级数据分析',
        'API接口',
        '自定义工作流',
        '优先技术支持'
      ],
      highlighted: true
    },
    {
      id: 'enterprise',
      name: '专业版',
      price: 3999,
      period: '/年',
      description: '适合大型企业全面部署',
      features: [
        '100个用户账号',
        '全部升级版功能',
        '私有化部署',
        '定制开发',
        '专属客户经理',
        '7x24小时支持'
      ],
      highlighted: false
    }
  ];

  const updateAddOnQuantity = (addOnId: 'ai' | 'verify', delta: number) => {
    setAddOns(prev => ({
      ...prev,
      [addOnId]: {
        ...prev[addOnId],
        quantity: Math.max(0, prev[addOnId].quantity + delta)
      }
    }));
  };

  const totalPrice = useMemo(() => {
    const planPrice = plans.find(p => p.id === selectedPlan)?.price || 0;
    const addOnTotal = Object.values(addOns).reduce((sum, addOn) => {
      return sum + (addOn.quantity * addOn.pricePerUnit);
    }, 0);
    return planPrice + addOnTotal;
  }, [selectedPlan, addOns]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <Navbar />

      {/* 页面内容 */}
      <main style={{ paddingTop: '96px', paddingBottom: '80px', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          {/* 标题区域 */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              选择适合您的方案
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              灵活的定价方案，满足不同规模企业的需求
            </p>
          </div>

          {/* 定价卡片 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '64px' }}>
            {plans.map((plan) => (
              <div 
                key={plan.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '32px',
                  border: selectedPlan === plan.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '520px'
                }}
              >
                {plan.highlighted && (
                  <div style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'inline-block',
                    position: 'absolute',
                    top: '-10px',
                    right: '24px'
                  }}>
                    最受欢迎
                  </div>
                )}
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  {plan.name}
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  {plan.price === 0 ? (
                    <span style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>免费</span>
                  ) : (
                    <>
                      <span style={{ fontSize: '3rem', fontWeight: '700', color: '#1f2937' }}>¥{plan.price}</span>
                      <span style={{ color: '#6b7280', fontSize: '16px' }}>{plan.period}</span>
                    </>
                  )}
                </div>
                <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '14px' }}>
                  {plan.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '24px' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginBottom: '12px',
                      color: '#4b5563',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: '#22c55e', fontSize: '14px' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedPlan === plan.id 
                      ? 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' 
                      : '#f3f4f6',
                    color: selectedPlan === plan.id ? 'white' : '#374151',
                    marginTop: 'auto'
                  }}
                >
                  {selectedPlan === plan.id ? '已选择' : '选择方案'}
                </button>
              </div>
            ))}
          </div>

          {/* 增值服务 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '48px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px', textAlign: 'center' }}>
              增值服务
            </h2>
            <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '32px' }}>
              根据需求选择额外的服务
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>AI使用额度</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>额外AI对话次数</p>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '15px' }}>
                    ¥{addOns.ai.pricePerUnit}{addOns.ai.unit}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    onClick={() => updateAddOnQuantity('ai', -1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      fontSize: '20px',
                      color: '#6b7280',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', minWidth: '40px', textAlign: 'center' }}>
                    {addOns.ai.quantity}
                  </span>
                  <button 
                    onClick={() => updateAddOnQuantity('ai', 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#3b82f6',
                      fontSize: '20px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>人/年</span>
                </div>
              </div>

              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>发票验真次数</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>额外发票验真次数</p>
                  </div>
                  <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '15px' }}>
                    ¥{addOns.verify.pricePerUnit}{addOns.verify.unit}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    onClick={() => updateAddOnQuantity('verify', -1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      fontSize: '20px',
                      color: '#6b7280',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', minWidth: '40px', textAlign: 'center' }}>
                    {addOns.verify.quantity}
                  </span>
                  <button 
                    onClick={() => updateAddOnQuantity('verify', 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      borderRadius: '8px',
                      backgroundColor: '#3b82f6',
                      fontSize: '20px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>千次</span>
                </div>
              </div>
            </div>

            {/* 费用汇总 */}
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '14px',
              padding: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
                    已选方案：{plans.find(p => p.id === selectedPlan)?.name}
                  </div>
                  {addOns.ai.quantity > 0 && (
                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                      + AI使用额度 × {addOns.ai.quantity} 人/年
                    </div>
                  )}
                  {addOns.verify.quantity > 0 && (
                    <div style={{ color: '#6b7280', fontSize: '14px' }}>
                      + 发票验真 × {addOns.verify.quantity} 千次
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>预计费用/年</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>
                    ¥{totalPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>邮箱：suh@sawell.cn</li>
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>电话：028-123112</li>
                <li style={{ marginBottom: '10px', color: '#9ca3af', fontSize: '14px' }}>地址：四川省成都市青羊区江汉路182号纺织大厦3楼</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #374151', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: '13px' }}>© 2026 四川恒信赛威科技有限公司，保留所有权利</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;