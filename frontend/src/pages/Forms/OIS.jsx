import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, TextArea, RadioGroup, TableInput } from './inputs';

const StopLogInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // Header Information
    corridor: '',
    location: '',
    date: '',
    
    // Inspection Checks
    inspectionChecks: {
      miningRequirements: { value: '', comments: '' },
      stopLogInspected: { value: '', comments: '' },
      anchorBoltsGround: { value: '', comments: '' },
      anchorBoltsSidewall: { value: '', comments: '' },
      sufficientLighting: { value: '', comments: '' },
      dustSuppressionSystem: { value: '', comments: '' },
      paintLineIndicators: { value: '', comments: '' },
      stopLogNotCovered: { value: '', comments: '' },
      bundErected: { value: '', comments: '' },
      signageBarricade: { value: '', comments: '' },
      radioCommuncation: { value: '', comments: '' }
    },
    
    // Final Question
    constructionCompleted: '',
    reasonsIfNot: '',
    
    // Signatures
    khoemacauRep: {
      name: '',
      signature: ''
    },
    barmincoRep: {
      name: '',
      signature: ''
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

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleInspectionChange = (item, field, value) => {
    setFormData(prev => ({
      ...prev,
      inspectionChecks: {
        ...prev.inspectionChecks,
        [item]: {
          ...prev.inspectionChecks[item],
          [field]: value
        }
      }
    }));
  };

  const renderInspectionHeader = () => (
    <div className="grid grid-cols-12 gap-px mb-px">
      <TableCell isHeader className="col-span-1">No.</TableCell>
      <TableCell isHeader className="col-span-4">STOP LOG/ORE PASS INSPECTION CHECKS DETAIL</TableCell>
      <TableCell isHeader className="col-span-2">YES/NO</TableCell>
      <TableCell isHeader className="col-span-5">COMMENTS</TableCell>
    </div>
  );

  const inspectionItems = [
    {
      key: 'miningRequirements',
      number: '1.',
      description: 'Is the mining of the ore pass meeting the requirements of the AFC'
    },
    {
      key: 'stopLogInspected',
      number: '2.',
      description: 'Has the stop log been inspected for damages?'
    },
    {
      key: 'anchorBoltsGround',
      number: '3.',
      description: 'Are the anchor bolts pining the stop log to the ground in place and secure?'
    },
    {
      key: 'anchorBoltsSidewall',
      number: '4.',
      description: 'Is the stop log anchor bolts and chain securing it to the sidewall installed and secure?'
    },
    {
      key: 'sufficientLighting',
      number: '5.',
      description: 'Is there sufficient lighting in place and operational?'
    },
    {
      key: 'dustSuppressionSystem',
      number: '6.',
      description: 'Is there a dust suppression system installed and operational?'
    },
    {
      key: 'paintLineIndicators',
      number: '7.',
      description: 'Are the paint line indicators marked on sidewalls and visible enough?'
    },
    {
      key: 'stopLogNotCovered',
      number: '8.',
      description: 'Is the stop log not covered by loose material from previous bogging activity?'
    },
    {
      key: 'bundErected',
      number: '9.',
      description: 'At the bottom of the ore pass has a bund erected prior to tipping?'
    },
    {
      key: 'signageBarricade',
      number: '10.',
      description: 'Is the signage, warning (if necessary) and barricade in place before tipping commences?'
    },
    {
      key: 'radioCommuncation',
      number: '11.',
      description: 'Remote bogger operator to use radio communication prior to tipping, specifying affected areas.'
    }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">

        {/* Location Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-600 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="CORRIDOR"
              value={formData.corridor}
              onChange={(e) => handleInputChange('corridor', e.target.value)}
            />
            <FormInput
              label="LOCATION"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <FormInput
              label="DATE"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>
        </div>

        {/* Inspection Checklist */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <div className="space-y-0">
            {renderInspectionHeader()}
            
            {inspectionItems.map(({ key, number, description }) => (
              <div key={key} className="grid grid-cols-12 gap-px mb-px">
                <TableCell className="col-span-1 font-bold text-gray-800 dark:text-gray-200 text-center">
                  {number}
                </TableCell>
                <TableCell className="col-span-4 font-medium text-gray-800 dark:text-gray-200 text-sm">
                  {description}
                </TableCell>
                <TableCell className="col-span-2">
                  <RadioGroup 
                    name={`inspection_${key}`}
                    value={formData.inspectionChecks[key]?.value || ''}
                    onChange={(value) => handleInspectionChange(key, 'value', value)}
                    options={[
                      { label: 'Yes', value: 'Yes' },
                      { label: 'No', value: 'No' }
                    ]}
                  />
                </TableCell>
                <TableCell className="col-span-5">
                  <TableInput 
                    value={formData.inspectionChecks[key]?.comments || ''}
                    onChange={(e) => handleInspectionChange(key, 'comments', e.target.value)}
                    placeholder="Enter comments..."
                  />
                </TableCell>
              </div>
            ))}
          </div>
        </div>

        {/* Final Completion Question */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-800 dark:text-gray-200 flex-1">
                Is the stop log/tip construction completed, meets the specification as stipulated in the contract agreement?
              </span>
              <div className="w-40">
                <RadioGroup 
                  name="construction_completed"
                  value={formData.constructionCompleted}
                  onChange={(value) => handleInputChange('constructionCompleted', value)}
                  options={[
                    { label: 'Yes', value: 'Yes' },
                    { label: 'No', value: 'No' }
                  ]}
                />
              </div>
            </div>
            
            <div>
              <TextArea 
                label="If NOT, please provide reasons:"
                value={formData.reasonsIfNot}
                onChange={(e) => handleInputChange('reasonsIfNot', e.target.value)}
                placeholder="Provide detailed reasons if construction is not completed to specification..."
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <SectionHeader title="Inspection completed By:" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Khoemacau Representative */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200 text-center">
                Khoemacau Representative
              </h3>
              <div className="space-y-4">
                <FormInput 
                  label="Name"
                  value={formData.khoemacauRep.name}
                  onChange={(e) => handleNestedChange('khoemacauRep', 'name', e.target.value)}
                  className="text-lg py-3"
                />
                <FormInput 
                  label="Signature"
                  value={formData.khoemacauRep.signature}
                  onChange={(e) => handleNestedChange('khoemacauRep', 'signature', e.target.value)}
                  className="text-lg py-3"
                />
              </div>
            </div>

            {/* Barminco Representative */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200 text-center">
                Barminco Representative
              </h3>
              <div className="space-y-4">
                <FormInput 
                  label="Name"
                  value={formData.barmincoRep.name}
                  onChange={(e) => handleNestedChange('barmincoRep', 'name', e.target.value)}
                  className="text-lg py-3"
                />
                <FormInput 
                  label="Signature"
                  value={formData.barmincoRep.signature}
                  onChange={(e) => handleNestedChange('barmincoRep', 'signature', e.target.value)}
                  className="text-lg py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopLogInspectionForm;