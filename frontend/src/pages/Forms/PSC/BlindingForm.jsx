import React from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from '../inputs';

const auditOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'N/A', value: 'N/A' }
];

const BlindingForm = ({ formData, handleInputChange, handleAuditChange }) => {
  const items = [
    { key: 'mixing_ratio', label: 'Concrete mixing ratio has been observed prior to casting?' },
    { key: 'planned_cubic_meters', label: 'Has the planned cubic meters of concrete been met to fill the pad?' },
    { key: 'dimensions_from_ground', label: 'Is the blinding within the stipulated dimensions from the solid ground as reference?' },
    { key: 'required_strength', label: 'Is the required strength met (10Mpa) to allow next construction phase?' }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <SectionHeader title="Blinding" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormInput
          label="Pad Location"
          value={formData.padLocation}
          onChange={(e) => handleInputChange('padLocation', e.target.value)}
        />
        <FormInput
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
        />
        <FormInput
          label="AFC No"
          value={formData.afcNo}
          onChange={(e) => handleInputChange('afcNo', e.target.value)}
        />
        <FormInput
          label="Pad Name"
          value={formData.padName}
          onChange={(e) => handleInputChange('padName', e.target.value)}
        />
      </div>

      <div className="p-4 border rounded mb-4">
        <div className="grid grid-cols-12 gap-px mb-px">
          <TableCell isHeader className="col-span-7">Item Description</TableCell>
          <TableCell isHeader className="col-span-2">Status</TableCell>
          <TableCell isHeader className="col-span-3">Comments</TableCell>
        </div>

        {items.map(({ key, label }) => (
          <div key={key} className="grid grid-cols-12 gap-px items-center mb-1">
            <TableCell className="col-span-7">{label}</TableCell>
            <TableCell className="col-span-2">
              <RadioGroup
                name={`blinding_${key}`}
                value={formData.blinding?.[key]?.value || ''}
                onChange={(value) => handleAuditChange('blinding', key, 'value', value)}
                options={auditOptions}
              />
            </TableCell>
            <TableCell className="col-span-3">
              <input
                type="text"
                className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none rounded px-1 py-1"
                value={formData.blinding?.[key]?.comments || ''}
                onChange={(e) => handleAuditChange('blinding', key, 'comments', e.target.value)}
                placeholder="Enter comments..."
              />
            </TableCell>
          </div>
        ))}
      </div>

      <div>
        <SectionHeader title="Approval" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Is the concrete casting for blinding approved for next stage?</label>
            <RadioGroup
              name="blinding_approved"
              value={formData.blinding?.approved || ''}
              onChange={(v) => handleInputChange('blinding.approved', v)}
              options={auditOptions}
            />
          </div>
          <div>
            <TextArea
              label="If Not, state reasons"
              value={formData.blinding?.notApprovedReasons || ''}
              onChange={(e) => handleInputChange('blinding.notApprovedReasons', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="KCM Representative Name"
            value={formData.blinding?.kcmName || ''}
            onChange={(e) => handleInputChange('blinding.kcmName', e.target.value)}
          />
          <FormInput
            label="Barminco Representative Name"
            value={formData.blinding?.barmincoName || ''}
            onChange={(e) => handleInputChange('blinding.barmincoName', e.target.value)}
          />
          <FormInput
            label="KCM Signature"
            value={formData.blinding?.kcmSignature || ''}
            onChange={(e) => handleInputChange('blinding.kcmSignature', e.target.value)}
          />
          <FormInput
            label="Barminco Signature"
            value={formData.blinding?.barmincoSignature || ''}
            onChange={(e) => handleInputChange('blinding.barmincoSignature', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlindingForm;
