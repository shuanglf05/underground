import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { 
  Building2, ChevronRight, MapPin, 
  Square, Phone, Mail, MessageSquare, 
  FileText, Camera, Clock 
} from 'lucide-react';

export default function Investment() {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: '',
  });

  const assets = [
    {
      id: 1,
      name: '一层黄金铺位A101',
      type: '商铺',
      area: '68',
      floor: '1层',
      status: 'available',
      price: '25000',
      description: '位于商场主入口，人流量大，适合品牌零售、餐饮等业态',
      images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'],
    },
    {
      id: 2,
      name: '二层餐饮区B205',
      type: '餐饮',
      area: '120',
      floor: '2层',
      status: 'available',
      price: '18000',
      description: '临近游乐区，适合特色餐饮、休闲餐厅',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'],
    },
    {
      id: 3,
      name: '三层娱乐区C301',
      type: '娱乐',
      area: '200',
      floor: '3层',
      status: 'available',
      price: '15000',
      description: '适合VR体验馆、电玩城等娱乐业态',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'],
    },
    {
      id: 4,
      name: '四层办公区D401',
      type: '办公',
      area: '350',
      floor: '4层',
      status: 'pending',
      price: '12000',
      description: '精装修办公室，配套设施齐全',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'],
    },
  ];

  const handleApply = () => {
    if (!formData.name || !formData.phone) {
      toast.error('请填写姓名和联系方式');
      return;
    }
    toast.success('提交成功！我们会尽快联系您');
    setShowApplyModal(false);
    setFormData({ name: '', phone: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/user')} className="text-white/80">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-lg font-bold">招商合作</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="bg-white mx-4 -mt-6 rounded-xl shadow-lg p-4 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-xs text-gray-500 mt-1">待租铺位</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">8,600</p>
            <p className="text-xs text-gray-500 mt-1">总面积(㎡)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">95%</p>
            <p className="text-xs text-gray-500 mt-1">入驻率</p>
          </div>
        </div>
      </div>

      {/* 功能入口 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-4">招商服务</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Phone, label: '招商热线', desc: '400-888-8888' },
            { icon: Mail, label: '邮箱', desc: 'investment@lanyuecheng.com' },
            { icon: MapPin, label: '地址', desc: '揽月城广场招商中心' },
            { icon: Clock, label: '时间', desc: '9:00-18:00' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setShowApplyModal(true)}
              className="flex flex-col items-center gap-2 p-2"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 招租列表 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">待租铺位</h2>
          <button className="text-sm text-purple-600">查看全部</button>
        </div>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <img
                src={asset.images[0]}
                alt={asset.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{asset.name}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    asset.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {asset.status === 'available' ? '可租' : '洽谈中'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Square className="w-3 h-3" />
                    {asset.area}㎡
                  </span>
                  <span>{asset.floor}</span>
                  <span>{asset.type}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-purple-600">¥{asset.price}/月</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 招商政策 */}
      <div className="bg-white mx-4 mt-4 rounded-xl p-4">
        <h2 className="text-base font-bold text-gray-900 mb-4">招商政策</h2>
        <div className="space-y-3">
          {[
            { title: '免租期优惠', desc: '新入驻商户享3-6个月免租期' },
            { title: '装修补贴', desc: '根据业态给予装修费用补贴' },
            { title: '营销支持', desc: '商场统一营销活动支持' },
            { title: '物业费减免', desc: '开业首年物业费减半' },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-purple-600">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 资产详情弹窗 */}
      <Modal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        title="资产详情"
        size="lg"
      >
        {selectedAsset && (
          <div className="p-4">
            <div className="mb-4">
              <img
                src={selectedAsset.images[0]}
                alt={selectedAsset.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedAsset.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                selectedAsset.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {selectedAsset.status === 'available' ? '可租' : '洽谈中'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">面积</p>
                <p className="font-bold text-gray-900">{selectedAsset.area}㎡</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">楼层</p>
                <p className="font-bold text-gray-900">{selectedAsset.floor}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">业态</p>
                <p className="font-bold text-gray-900">{selectedAsset.type}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">租金</p>
                <p className="font-bold text-purple-600">¥{selectedAsset.price}/月</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">描述</p>
              <p className="text-gray-700 mt-1">{selectedAsset.description}</p>
            </div>
            <Button onClick={() => { setSelectedAsset(null); setShowApplyModal(true); }}>
              提交合作意向
            </Button>
          </div>
        )}
      </Modal>

      {/* 合作意向申请弹窗 */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="提交合作意向"
        size="lg"
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">姓名 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="请输入您的姓名"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">联系电话 *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="请输入联系电话"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">公司名称</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="请输入公司名称"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">留言</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="请描述您的合作意向"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button onClick={handleApply} className="w-full">提交</Button>
        </div>
      </Modal>
    </div>
  );
}