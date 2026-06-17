import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { toast } from '../../components/ui/Toast';
import { AlertTriangle, Camera, MapPin, Clock, ArrowLeft, Send } from 'lucide-react';

export default function DeviceReport() {
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reportData, setReportData] = useState({
    deviceType: '',
    deviceName: '',
    location: '',
    description: '',
    photos: [],
    urgency: 'medium',
  });

  const deviceTypes = [
    { id: 'locker', name: '储物柜', icon: 'lock' },
    { id: 'vending', name: '售货柜', icon: 'box' },
    { id: 'vr', name: 'VR设备', icon: 'headset' },
    { id: 'billiards', name: '台球桌', icon: 'circle' },
    { id: 'gate', name: '闸机', icon: 'door' },
    { id: 'lighting', name: '灯光', icon: 'bulb' },
    { id: 'arcade', name: '电玩', icon: 'gamepad' },
    { id: 'other', name: '其他', icon: 'more' },
  ];

  const locations = ['A区', 'B区', 'C区', 'D区', '餐饮区', '游乐区', '休息区', '办公区'];

  const urgencyOptions = [
    { id: 'low', label: '一般', color: 'bg-green-100 text-green-800' },
    { id: 'medium', label: '中等', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'high', label: '紧急', color: 'bg-red-100 text-red-800' },
  ];

  const handleAddPhoto = () => {
    const newPhoto = `photo_${Date.now()}`;
    setReportData({ ...reportData, photos: [...reportData.photos, newPhoto] });
    toast.info('已模拟拍照');
  };

  const handleRemovePhoto = (index: number) => {
    setReportData({ 
      ...reportData, 
      photos: reportData.photos.filter((_, i) => i !== index) 
    });
  };

  const handleSubmit = () => {
    if (!reportData.deviceType || !reportData.location || !reportData.description) {
      toast.error('请填写完整信息');
      return;
    }
    toast.success('故障上报成功，工单已推送至后台');
    setShowSubmitModal(false);
    setReportData({
      deviceType: '',
      deviceName: '',
      location: '',
      description: '',
      photos: [],
      urgency: 'medium',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/service')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">设备故障上报</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">选择设备类型</h2>
        <div className="grid grid-cols-4 gap-2">
          {deviceTypes.map((device) => (
            <button
              key={device.id}
              onClick={() => setReportData({ ...reportData, deviceType: device.id, deviceName: device.name })}
              className={`p-3 rounded-lg text-center transition-colors ${
                reportData.deviceType === device.id 
                  ? 'bg-orange-100 border-2 border-orange-500' 
                  : 'bg-gray-50 border-2 border-transparent'
              }`}
            >
              <AlertTriangle className={`w-6 h-6 mx-auto mb-1 ${
                reportData.deviceType === device.id ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <span className={`text-xs ${
                reportData.deviceType === device.id ? 'text-orange-600 font-medium' : 'text-gray-600'
              }`}>
                {device.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">选择位置</h2>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setReportData({ ...reportData, location })}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                reportData.location === location 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-1" />
              {location}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">故障描述</h2>
        <textarea
          value={reportData.description}
          onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
          placeholder="请详细描述故障情况，如：卡币、无法启动、灯光不亮等..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">上传照片</h2>
        <div className="flex gap-2">
          {reportData.photos.map((_, index) => (
            <div key={index} className="relative w-20 h-20 bg-gray-100 rounded-lg">
              <img
                src={`https://picsum.photos/seed/${index}/100/100`}
                alt={`照片${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleAddPhoto}
            className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-orange-500 transition-colors"
          >
            <Camera className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">拍照</span>
          </button>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">紧急程度</h2>
        <div className="flex gap-3">
          {urgencyOptions.map((urgency) => (
            <button
              key={urgency.id}
              onClick={() => setReportData({ ...reportData, urgency: urgency.id })}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                reportData.urgency === urgency.id 
                  ? urgency.color + ' ring-2 ring-offset-2 ring-orange-500' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="font-medium">{urgency.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={() => setShowSubmitModal(true)} 
        className="w-full mt-4 mx-4 mb-8 bg-orange-600 hover:bg-orange-700"
      >
        <Send className="w-4 h-4 mr-2" />
        提交故障报告
      </Button>

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="确认提交"
      >
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div>
                <p className="font-medium text-gray-900">设备故障上报</p>
                <p className="text-sm text-gray-500">工单将自动推送至后台管理系统</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">设备类型</span>
                <span className="font-medium">{reportData.deviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">位置</span>
                <span className="font-medium">{reportData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">紧急程度</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  urgencyOptions.find(u => u.id === reportData.urgency)?.color
                }`}>
                  {urgencyOptions.find(u => u.id === reportData.urgency)?.label}
                </span>
              </div>
              {reportData.description && (
                <div>
                  <span className="text-gray-500">描述</span>
                  <p className="font-medium mt-1">{reportData.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowSubmitModal(false)} variant="outline">取消</Button>
            <Button onClick={handleSubmit} className="bg-orange-600">确认提交</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}