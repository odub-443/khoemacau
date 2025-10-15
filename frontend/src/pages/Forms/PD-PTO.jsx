import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from './inputs';

const ProductionDrillingPTOForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // General Information
    date: '',
    corridor: '',
    stope: '',
    productionDrillingType: '',
    soloNumber: '',
    soloOperator: '',

    // Pre-Drilling Audit
    preDrilling: {
      siteInspected: { value: '', comments: '' },
      drillingPlanAvailable: { value: '', comments: '' },
      ringsMarked: { value: '', comments: '' },
      laserLinesMarked: { value: '', comments: '' },
      pivotPointMarked: { value: '', comments: '' }
    },

    // Rig Setting
    rigSetting: {
      rigOnOutriggers: { value: '', comments: '' },
      laserOnLines: { value: '', comments: '' },
      signagesInPlace: { value: '', comments: '' }
    },

    // Drilling
    drilling: {
      correctDrillBit: { value: '', comments: '' },
      dumpAnglesAttained: { value: '', comments: '' },
      collaringCorrect: { value: '', comments: '' },
      feedPercussionSettings: { value: '', comments: '' },
      holesToDesignLength: { value: '', comments: '' },
      breakthroughsMarked: { value: '', comments: '' },
      reDrillAttempted: { value: '', comments: '' }
    },

    // Post Drilling
    postDrilling: {
      drillReturnCompleted: { value: '', comments: '' },
      holesMarked: { value: '', comments: '' }
    },

    // Closing
    inspectedBy: '',
    signature: ''
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

  const handleAuditChange = (section, item, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: {
          ...prev[section][item],
          [field]: value
        }
      }
    }));
  };

  const auditOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    { label: 'N/A', value: 'N/A' }
  ];

  const renderAuditTable = (sectionTitle, sectionKey, items) => (
    <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
      <SectionHeader title={sectionTitle} />
      <div className="grid grid-cols-12 gap-px mb-px">
        <TableCell isHeader className="col-span-5">Audit Item</TableCell>
        <TableCell isHeader className="col-span-2">Status</TableCell>
        <TableCell isHeader className="col-span-5">Comments</TableCell>
      </div>
      {items.map(({ key, label }) => (
        <div key={key} className="grid grid-cols-12 gap-px mb-px">
          <TableCell className="col-span-5 font-medium text-gray-800 dark:text-gray-200 text-sm">
            {label}
          </TableCell>
          <TableCell className="col-span-2">
            <RadioGroup
              name={`${sectionKey}_${key}`}
              value={formData[sectionKey]?.[key]?.value || ''}
              onChange={(value) => handleAuditChange(sectionKey, key, 'value', value)}
              options={auditOptions}
            />
          </TableCell>
          <TableCell className="col-span-5">
            <input
              type="text"
              className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 rounded px-1 py-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={formData[sectionKey]?.[key]?.comments || ''}
              onChange={(e) => handleAuditChange(sectionKey, key, 'comments', e.target.value)}
              placeholder="Enter comments..."
            />
          </TableCell>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">
        {/* Header Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-600 transition-colors">
          <SectionHeader title="General Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
              label="Stope"
              value={formData.stope}
              onChange={(e) => handleInputChange('stope', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput
              label="Production Drilling Type"
              value={formData.productionDrillingType}
              onChange={(e) => handleInputChange('productionDrillingType', e.target.value)}
            />
            <FormInput
              label="Solo Number"
              value={formData.soloNumber}
              onChange={(e) => handleInputChange('soloNumber', e.target.value)}
            />
            <FormInput
              label="Solo Operator"
              value={formData.soloOperator}
              onChange={(e) => handleInputChange('soloOperator', e.target.value)}
            />
          </div>
        </div>

        {/* Audit Sections */}
        {renderAuditTable("Pre-Drilling Audit", "preDrilling", [
          { key: 'siteInspected', label: 'Has the site been inspected by PIC (washed & made safe)?' },
          { key: 'drillingPlanAvailable', label: 'Is the Drilling Plan available with the operator?' },
          { key: 'ringsMarked', label: 'Have the rings been marked by the surveyor?' },
          { key: 'laserLinesMarked', label: 'Are laser reference lines marked on both walls?' },
          { key: 'pivotPointMarked', label: 'Is the pivot point marked on the backs?' }
        ])}

        {renderAuditTable("Rig Setting", "rigSetting", [
          { key: 'rigOnOutriggers', label: 'Is the rig supported on outriggers?' },
          { key: 'laserOnLines', label: 'Is the laser set on reference lines?' },
          { key: 'signagesInPlace', label: 'Are all required signages in place?' }
        ])}

        {renderAuditTable("Drilling", "drilling", [
          { key: 'correctDrillBit', label: 'Is the operator using the correct drill bit size?' },
          { key: 'dumpAnglesAttained', label: 'Are dump & drill angles attained before drilling?' },
          { key: 'collaringCorrect', label: 'Is collaring done at the marked collar point with no deviation?' },
          { key: 'feedPercussionSettings', label: 'Are feed & percussion rates at desired settings?' },
          { key: 'holesToDesignLength', label: 'Are holes being drilled to design length?' },
          { key: 'breakthroughsMarked', label: 'Are breakthroughs identified and marked?' },
          { key: 'reDrillAttempted', label: 'If breakthroughs exist, has re-drilling been attempted?' }
        ])}

        {renderAuditTable("Post Drilling", "postDrilling", [
          { key: 'drillReturnCompleted', label: 'Has the operator completed the drill return as required?' },
          { key: 'holesMarked', label: 'Are holes marked for identification (Breakthrough/Complete)?' }
        ])}

        {/* Closing Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="Closing Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Inspected By"
              value={formData.inspectedBy}
              onChange={(e) => handleInputChange('inspectedBy', e.target.value)}
            />
            <FormInput
              label="Signature"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionDrillingPTOForm;
