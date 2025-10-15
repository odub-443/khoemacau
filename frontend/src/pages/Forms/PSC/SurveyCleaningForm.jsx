import React from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from '../inputs';

const auditOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'N/A', value: 'N/A' }
];

const SurveyCleaningForm = ({ formData, handleInputChange, handleAuditChange }) => {
  const items = [
    { key: 'survey_pegs', label: 'Has the area been surveyed, pegs installed for demarcation?' },
    { key: 'as_is_fit', label: 'Does the "As Is Drawing" fit the Engineering Drawing Specifications as per AFC?' },
    { key: 'cleaned_hard_rock', label: 'Has the area been properly cleaned, hard rock exposed and kept dry?' },
    { key: 'highest_point_identified', label: 'Has the highest point been identified?' },
    { key: 'blast_highest_point', label: 'Does the highest point need blasting out to reduce blinding height relative to footwall?' }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden p-6">      <SectionHeader title="Survey & Cleaning" />
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
                name={`survey_${key}`}
                value={formData.survey?.[key]?.value || ''}
                onChange={(value) => handleAuditChange('survey', key, 'value', value)}
                options={auditOptions}
              />
            </TableCell>
            <TableCell className="col-span-3">
              <input
                type="text"
                  className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none rounded px-1 py-2"
                value={formData.survey?.[key]?.comments || ''}
                onChange={(e) => handleAuditChange('survey', key, 'comments', e.target.value)}
                placeholder="Enter comments..."
              />
            </TableCell>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <SectionHeader title="Approval" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Is the concrete pad preparation approved for next stage of construction?</label>
            <RadioGroup
              name="survey_approved"
              value={formData.survey?.approved || ''}
              onChange={(v) => handleInputChange('survey.approved', v)}
              options={auditOptions}
            />
          </div>
          <div>
            <TextArea
              label="If Not, state reasons"
              value={formData.survey?.notApprovedReasons || ''}
              onChange={(e) => handleInputChange('survey.notApprovedReasons', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormInput
            label="KCM Representative Name"
            value={formData.survey?.kcmName || ''}
            onChange={(e) => handleInputChange('survey.kcmName', e.target.value)}
          />
          <FormInput
            label="Barminco Representative Name"
            value={formData.survey?.barmincoName || ''}
            onChange={(e) => handleInputChange('survey.barmincoName', e.target.value)}
          />
          <FormInput
            label="KCM Signature"
            value={formData.survey?.kcmSignature || ''}
            onChange={(e) => handleInputChange('survey.kcmSignature', e.target.value)}
          />
          <FormInput
            label="Barminco Signature"
            value={formData.survey?.barmincoSignature || ''}
            onChange={(e) => handleInputChange('survey.barmincoSignature', e.target.value)}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SurveyCleaningForm;