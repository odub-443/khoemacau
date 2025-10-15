import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, TableInput } from './inputs';

const ActiveStopingInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // Header Information
    date: '',
    corridor: '',
    stopeName: '',
    completedBy: '',
    signature: '',
    
    // Audit Sections
    ventilation: {
      distanceFlowRate: '',
      ductCondition: '',
      areasChocked: '',
      comments: ''
    },
    roadways: {
      conditionStatus: '',
      drainage: '',
      comments: ''
    },
    signageBund: {
      placed: '',
      visible: '',
      bundPlacement: '',
      comments: ''
    },
    groundSupport: {
      browCablesInstalled: '',
      browCablesCondition: '',
      crownCablesCondition: '',
      comments: ''
    },
    firingLine: {
      condition: '',
      distanceToStope: '',
      comments: ''
    },
    mineServices: {
      servicesRetracted: '',
      condition: '',
      comments: ''
    }
  });

  useEffect(()=>{
    onChange(formData)
  },[formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden transition-colors">

        {/* Basic Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-600 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FormInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <FormInput
              label="Corridor"
              value={formData.corridor}
              onChange={(e) => handleInputChange('corridor', e.target.value)}
            />
            <FormInput
              label="Stope Name"
              value={formData.stopeName}
              onChange={(e) => handleInputChange('stopeName', e.target.value)}
            />
          </div>
        </div>

        {/* Active Stope Audit Table */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="ACTIVE STOPE AUDIT" />
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-2">CATEGORY</TableCell>
            <TableCell isHeader className="col-span-3">FIELD 1</TableCell>
            <TableCell isHeader className="col-span-2">FIELD 2</TableCell>
            <TableCell isHeader className="col-span-3">FIELD 3</TableCell>
            <TableCell isHeader className="col-span-2">COMMENTS</TableCell>
          </div>

          {/* Ventilation Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200">
              VENTILATION
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Distance to stope & Flow rate</label>
                <TableInput
                  value={formData.ventilation.distanceFlowRate}
                  onChange={(e) => handleSectionChange('ventilation', 'distanceFlowRate', e.target.value)}
                  placeholder="Enter distance & flow rate"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Duct Condition</label>
                <TableInput
                  value={formData.ventilation.ductCondition}
                  onChange={(e) => handleSectionChange('ventilation', 'ductCondition', e.target.value)}
                  placeholder="Enter duct condition"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Areas Chocked (state Chainage)</label>
                <TableInput
                  value={formData.ventilation.areasChocked}
                  onChange={(e) => handleSectionChange('ventilation', 'areasChocked', e.target.value)}
                  placeholder="Enter areas chocked"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.ventilation.comments}
                onChange={(e) => handleSectionChange('ventilation', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>

          {/* Roadways Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200 bg-blue-100 dark:bg-blue-900">
              ROADWAYS
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Condition/Status</label>
                <TableInput
                  value={formData.roadways.conditionStatus}
                  onChange={(e) => handleSectionChange('roadways', 'conditionStatus', e.target.value)}
                  placeholder="Enter condition/status"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Drainage</label>
                <TableInput
                  value={formData.roadways.drainage}
                  onChange={(e) => handleSectionChange('roadways', 'drainage', e.target.value)}
                  placeholder="Enter drainage info"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              {/* Empty cell for roadways */}
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.roadways.comments}
                onChange={(e) => handleSectionChange('roadways', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>

          {/* Signage & Bund Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200">
              SIGNAGE & BUND
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Placed</label>
                <TableInput
                  value={formData.signageBund.placed}
                  onChange={(e) => handleSectionChange('signageBund', 'placed', e.target.value)}
                  placeholder="Enter placement info"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Visible</label>
                <TableInput
                  value={formData.signageBund.visible}
                  onChange={(e) => handleSectionChange('signageBund', 'visible', e.target.value)}
                  placeholder="Enter visibility info"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Bund Placement & Condition</label>
                <TableInput
                  value={formData.signageBund.bundPlacement}
                  onChange={(e) => handleSectionChange('signageBund', 'bundPlacement', e.target.value)}
                  placeholder="Enter bund info"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.signageBund.comments}
                onChange={(e) => handleSectionChange('signageBund', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>

          {/* Ground Support Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200">
              GROUND SUPPORT
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Brow cables installed</label>
                <TableInput
                  value={formData.groundSupport.browCablesInstalled}
                  onChange={(e) => handleSectionChange('groundSupport', 'browCablesInstalled', e.target.value)}
                  placeholder="Enter installation status"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Brow cables Condition</label>
                <TableInput
                  value={formData.groundSupport.browCablesCondition}
                  onChange={(e) => handleSectionChange('groundSupport', 'browCablesCondition', e.target.value)}
                  placeholder="Enter brow cable condition"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Crown cables condition @ 90ML</label>
                <TableInput
                  value={formData.groundSupport.crownCablesCondition}
                  onChange={(e) => handleSectionChange('groundSupport', 'crownCablesCondition', e.target.value)}
                  placeholder="Enter crown cable condition"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.groundSupport.comments}
                onChange={(e) => handleSectionChange('groundSupport', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>

          {/* Firing Line Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200">
              FIRING LINE
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Condition</label>
                <TableInput
                  value={formData.firingLine.condition}
                  onChange={(e) => handleSectionChange('firingLine', 'condition', e.target.value)}
                  placeholder="Enter firing line condition"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Distance to stope</label>
                <TableInput
                  value={formData.firingLine.distanceToStope}
                  onChange={(e) => handleSectionChange('firingLine', 'distanceToStope', e.target.value)}
                  placeholder="Enter distance to stope"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              {/* Empty cell for firing line */}
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.firingLine.comments}
                onChange={(e) => handleSectionChange('firingLine', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>

          {/* Mine Services Row */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell className="col-span-2 font-bold text-gray-800 dark:text-gray-200">
              MINE SERVICES
            </TableCell>
            <TableCell className="col-span-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Services Retracted</label>
                <TableInput
                  value={formData.mineServices.servicesRetracted}
                  onChange={(e) => handleSectionChange('mineServices', 'servicesRetracted', e.target.value)}
                  placeholder="Enter retraction status"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Condition</label>
                <TableInput
                  value={formData.mineServices.condition}
                  onChange={(e) => handleSectionChange('mineServices', 'condition', e.target.value)}
                  placeholder="Enter service condition"
                />
              </div>
            </TableCell>
            <TableCell className="col-span-3">
              {/* Empty cell for mine services */}
            </TableCell>
            <TableCell className="col-span-2">
              <TableInput
                value={formData.mineServices.comments}
                onChange={(e) => handleSectionChange('mineServices', 'comments', e.target.value)}
                placeholder="Comments"
              />
            </TableCell>
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput 
              label="Completed by"
              value={formData.completedBy}
              onChange={(e) => handleInputChange('completedBy', e.target.value)}
              className="text-lg py-3"
            />
            <FormInput 
              label="Signature"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveStopingInspectionForm;