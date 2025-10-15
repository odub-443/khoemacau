import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from './inputs';

const RefugeChamberInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    corridor: '',
    date: '',
    location: '',
    size: '',
    chamberNo: '',
    signage: {
      presence: { value: '', comments: '' },
      placement: { value: '', comments: '' },
      reflective: { value: '', comments: '' },
      cleanLegible: { value: '', comments: '' },
      greenLight: { value: '', comments: '' }
    },
    placement: {
      approvedDesign: { value: '', comments: '' },
      levelPad: { value: '', comments: '' },
      gradedArea: { value: '', comments: '' },
      noPooling: { value: '', comments: '' },
      waterAirConnected: { value: '', comments: '' },
      inspectionBook: { value: '', comments: '' },
      onlyForRefuge: { value: '', comments: '' },
      suppliedWithEssentials: { value: '', comments: '' }
    },
    validation: {
      compliant: { value: '', comments: '' }
    },
    mmgRep: { name: '', signature: '' },
    contractorRep: { name: '', signature: '' }
  });


  useEffect(()=>{
    onChange(formData)
  },[formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const renderAuditTable = (title, sectionKey, items) => (
    <div className="p-6 border-b-4 border-gray-300 bg-white dark:bg-gray-900">
      <SectionHeader title={title} />
      <div className="grid grid-cols-12 gap-px mb-px">
        <TableCell isHeader className="col-span-5">Item</TableCell>
        <TableCell isHeader className="col-span-2">Status</TableCell>
        <TableCell isHeader className="col-span-5">Comments</TableCell>
      </div>
      {items.map(({ key, label }) => (
        <div key={key} className="grid grid-cols-12 gap-px mb-px">
          <TableCell className="col-span-5 font-medium">{label}</TableCell>
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
              className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 py-1"
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
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
        
        {/* General Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300">
          <SectionHeader title="General Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <FormInput label="Corridor" value={formData.corridor} onChange={(e) => handleInputChange('corridor', e.target.value)} />
            <FormInput label="Date" type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            <FormInput label="Refuge Chamber Location" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
            <FormInput label="Refuge Chamber Size" value={formData.size} onChange={(e) => handleInputChange('size', e.target.value)} />
            <FormInput label="Refuge Chamber Number" value={formData.chamberNo} onChange={(e) => handleInputChange('chamberNo', e.target.value)} />
          </div>
        </div>

        {/* Sections */}
        {renderAuditTable("Signage", "signage", [
          { key: 'presence', label: 'Is there signage to indicate presence of a refuge chamber?' },
          { key: 'placement', label: 'Is it properly hung in the right place (sidewall) and visible?' },
          { key: 'reflective', label: 'Is it made of a retro-reflective material?' },
          { key: 'cleanLegible', label: 'Is it maintained in clean and legible condition?' },
          { key: 'greenLight', label: 'Is the location indicated by a green light in the Decline?' }
        ])}

        {renderAuditTable("Refuge Chamber Placement", "placement", [
          { key: 'approvedDesign', label: 'Design approved by principal (MineSAFE & MineARC Systems)?' },
          { key: 'levelPad', label: 'Positioned on a level compacted road base pad?' },
          { key: 'gradedArea', label: 'Area surrounding chamber graded to direct water away?' },
          { key: 'noPooling', label: 'Shielded from water / not in pooling area?' },
          { key: 'waterAirConnected', label: 'Water and Air connected from adjacent droppers?' },
          { key: 'inspectionBook', label: 'Book provided for daily inspection?' },
          { key: 'onlyForRefuge', label: 'Not used for any other purpose?' },
          { key: 'suppliedWithEssentials', label: 'Provided with water, maps, comms, oxygen, first aid?' }
        ])}

        {/* Validation Checklist */}
        {renderAuditTable("Validation Checklist", "validation", [
          { key: 'compliant', label: 'Is the refuge chamber compliant to specifications in agreement?' }
        ])}

        {/* Closing */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800">
          <SectionHeader title="Closing Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="MMG Representative Name" value={formData.mmgRep.name} onChange={(e) => setFormData(prev => ({ ...prev, mmgRep: { ...prev.mmgRep, name: e.target.value } }))} />
            <FormInput label="Signature" value={formData.mmgRep.signature} onChange={(e) => setFormData(prev => ({ ...prev, mmgRep: { ...prev.mmgRep, signature: e.target.value } }))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <FormInput label="Contractor Representative Name" value={formData.contractorRep.name} onChange={(e) => setFormData(prev => ({ ...prev, contractorRep: { ...prev.contractorRep, name: e.target.value } }))} />
            <FormInput label="Signature" value={formData.contractorRep.signature} onChange={(e) => setFormData(prev => ({ ...prev, contractorRep: { ...prev.contractorRep, signature: e.target.value } }))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefugeChamberInspectionForm;
