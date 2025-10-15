import React from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from '../inputs';

const auditOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'N/A', value: 'N/A' }
];

const FinalInspectionForm = ({ formData, handleInputChange, handleAuditChange }) => {
  const items = [
    { key: 'cured_as_per_afc', label: 'Has the concrete pad been allowed time to cure as per AFC requirement?' },
    { key: 'min_30mpa_28days', label: 'Did the concrete pad achieve the minimum of 30Mpa of compressive strength after 28 days?' },
    { key: 'dockets_avail', label: 'Have all the dockets been availed and certify the specifications as per AFC requirement?' },
    { key: 'surfaces_chamfered', label: 'Are the exposed concrete surfaces and corners chamfered and smoothed with a wood float finish?' },
    { key: 'signage_put_up', label: 'Has proper signage been put up to restrict movement into the area?' }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <SectionHeader title="Final Inspection" />
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
                name={`final_${key}`}
                value={formData.final?.[key]?.value || ''}
                onChange={(value) => handleAuditChange('final', key, 'value', value)}
                options={auditOptions}
              />
            </TableCell>
            <TableCell className="col-span-3">
              <input
                type="text"
                className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none rounded px-1 py-1"
                value={formData.final?.[key]?.comments || ''}
                onChange={(e) => handleAuditChange('final', key, 'comments', e.target.value)}
                placeholder="Enter comments..."
              />
            </TableCell>
          </div>
        ))}
      </div>

      <div>
        <SectionHeader title="Completion & Approval" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Has the concrete pad construction been executed as per applicable sections in Schedule 5 and 6 of the Agreement and accepted by the client?</label>
            <RadioGroup
              name="final_accepted"
              value={formData.final?.accepted || ''}
              onChange={(v) => handleInputChange('final.accepted', v)}
              options={auditOptions}
            />
          </div>
          <div>
            <TextArea
              label="If Not, state reasons"
              value={formData.final?.notAcceptedReasons || ''}
              onChange={(e) => handleInputChange('final.notAcceptedReasons', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="KCM Representative Name"
            value={formData.final?.kcmName || ''}
            onChange={(e) => handleInputChange('final.kcmName', e.target.value)}
          />
          <FormInput
            label="Barminco Representative Name"
            value={formData.final?.barmincoName || ''}
            onChange={(e) => handleInputChange('final.barmincoName', e.target.value)}
          />
          <FormInput
            label="KCM Signature"
            value={formData.final?.kcmSignature || ''}
            onChange={(e) => handleInputChange('final.kcmSignature', e.target.value)}
          />
          <FormInput
            label="Barminco Signature"
            value={formData.final?.barmincoSignature || ''}
            onChange={(e) => handleInputChange('final.barmincoSignature', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalInspectionForm;
