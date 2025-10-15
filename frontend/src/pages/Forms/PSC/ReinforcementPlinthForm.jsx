import React from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from '../inputs';

const auditOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'N/A', value: 'N/A' }
];

const ReinforcementPlinthForm = ({ formData, handleInputChange, handleAuditChange }) => {
  const reinforcementItems = [
    { key: 'dowel_positions_marked', label: 'Have the positions of the dowel bars been marked on the blinding as per AFC?' },
    { key: 'holes_drilled_depth_diameter', label: 'Have the holes been drilled to required depth and right diameter as stipulated in AFC?' },
    { key: 'dowel_sizes', label: 'Are dowel bar sizes as specified in the AFC?' },
    { key: 'grout_material', label: 'Is grout material used as per manufacturer instructions?' },
    { key: 'mesh_installed', label: 'Has mesh been installed as per reinforcement notes (METSO Drawing C-7121-003-003)?' }
  ];

  const plinthItems = [
    { key: 'plinth_dimensions', label: 'Are plinths constructed as per dimensions and specs in AFC?' },
    { key: 'horizontal_surface_finish', label: 'Do horizontal surfaces have a wood float finish?' },
    { key: 'exposed_surface_finish', label: 'Does exposed concrete have smooth off-shutter finish?' }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <SectionHeader title="Reinforcement & Plinth Construction" />
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

      <div className="mb-4">
        <SectionHeader title="Reinforcement" />
        <div className="p-4 border rounded">
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-7">Item Description</TableCell>
            <TableCell isHeader className="col-span-2">Status</TableCell>
            <TableCell isHeader className="col-span-3">Comments</TableCell>
          </div>

          {reinforcementItems.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-12 gap-px items-center mb-1">
              <TableCell className="col-span-7">{label}</TableCell>
              <TableCell className="col-span-2">
                <RadioGroup
                  name={`reinforcement_${key}`}
                  value={formData.reinforcement?.[key]?.value || ''}
                  onChange={(value) => handleAuditChange('reinforcement', key, 'value', value)}
                  options={auditOptions}
                />
              </TableCell>
              <TableCell className="col-span-3">
                <input
                  type="text"
                  className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none rounded px-1 py-1"
                  value={formData.reinforcement?.[key]?.comments || ''}
                  onChange={(e) => handleAuditChange('reinforcement', key, 'comments', e.target.value)}
                  placeholder="Enter comments..."
                />
              </TableCell>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <SectionHeader title="Plinth Construction" />
        <div className="p-4 border rounded">
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-7">Item Description</TableCell>
            <TableCell isHeader className="col-span-2">Status</TableCell>
            <TableCell isHeader className="col-span-3">Comments</TableCell>
          </div>

          {plinthItems.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-12 gap-px items-center mb-1">
              <TableCell className="col-span-7">{label}</TableCell>
              <TableCell className="col-span-2">
                <RadioGroup
                  name={`plinth_${key}`}
                  value={formData.plinth?.[key]?.value || ''}
                  onChange={(value) => handleAuditChange('plinth', key, 'value', value)}
                  options={auditOptions}
                />
              </TableCell>
              <TableCell className="col-span-3">
                <input
                  type="text"
                  className="w-full h-full border-0  bg-gray-100 dark:bg-gray-800 focus:outline-none rounded px-1 py-1"
                  value={formData.plinth?.[key]?.comments || ''}
                  onChange={(e) => handleAuditChange('plinth', key, 'comments', e.target.value)}
                  placeholder="Enter comments..."
                />
              </TableCell>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Approval" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Is the reinforcement & plinth construction approved for next stage?</label>
            <RadioGroup
              name="reinforcement_approved"
              value={formData.reinforcement?.approved || ''}
              onChange={(v) => handleInputChange('reinforcement.approved', v)}
              options={auditOptions}
            />
          </div>
          <div>
            <TextArea
              label="If Not, state reasons"
              value={formData.reinforcement?.notApprovedReasons || ''}
              onChange={(e) => handleInputChange('reinforcement.notApprovedReasons', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="KCM Representative Name"
            value={formData.reinforcement?.kcmName || ''}
            onChange={(e) => handleInputChange('reinforcement.kcmName', e.target.value)}
          />
          <FormInput
            label="Barminco Representative Name"
            value={formData.reinforcement?.barmincoName || ''}
            onChange={(e) => handleInputChange('reinforcement.barmincoName', e.target.value)}
          />
          <FormInput
            label="KCM Signature"
            value={formData.reinforcement?.kcmSignature || ''}
            onChange={(e) => handleInputChange('reinforcement.kcmSignature', e.target.value)}
          />
          <FormInput
            label="Barminco Signature"
            value={formData.reinforcement?.barmincoSignature || ''}
            onChange={(e) => handleInputChange('reinforcement.barmincoSignature', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReinforcementPlinthForm;
