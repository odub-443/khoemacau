import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, TextArea, RadioGroup, TableInput, ComplianceRow } from './inputs';

const FibrecreteObservationForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // Header Information
    date: '',
    shift: '',
    corridor: '',
    time: '',
    workAreaChainage: '',
    
    // Manning
    sprayingCrew: '',
    operators: '',
    mineCaptain: '',
    shiftBoss: '',
    personInCharge: '',
    
    // Observation Items
    observations: {
      workAreaSignposted: { value: '', comments: '' },
      swicDone: { value: '', comments: '' },
      shotcretePPE: { value: '', comments: '' },
      sprayMechChecklist: { value: '', comments: '' },
      exposedAreaScaled: { value: '', comments: '' },
      workersInSupported: { value: '', comments: '' },
      chemicalHandling: { value: '', comments: '' },
      noPersonInFront: { value: '', comments: '' },
      hydroScaled: { value: '', comments: '' },
      areaInFrontDemarcated: { value: '', comments: '' },
      correctThickness: { value: '', comments: '' },
      correctDistance: { value: '', comments: '' },
      sprayingAngle: { value: '', comments: '' },
      correctOverlap: { value: '', comments: '' },
      panelsSprayedQA: { value: '', comments: '' },
      depthChecks: { value: '', comments: '' },
      supervisorInspected: { value: '', comments: '' },
      correctChainage: { value: '', comments: '' }
    },
    
    // Final Sections
    observationsText: '',
    recommendations: '',
    conductedByName: '',
    conductedBySignature: ''
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

  const handleObservationChange = (item, field, value) => {
    setFormData(prev => ({
      ...prev,
      observations: {
        ...prev.observations,
        [item]: {
          ...prev.observations[item],
          [field]: value
        }
      }
    }));
  };

  const renderObservationHeader = () => (
    <div className="grid grid-cols-12 gap-px mb-px">
      <TableCell isHeader className="col-span-5">Item</TableCell>
      <TableCell isHeader className="col-span-2">YES/NO/N/A</TableCell>
      <TableCell isHeader className="col-span-5">Comments</TableCell>
    </div>
  );

  const observationItems = [
    {
      key: 'workAreaSignposted',
      description: 'Work area correctly signposted ("Danger Unsupported Ground")'
    },
    {
      key: 'swicDone',
      description: 'SWIC Done'
    },
    {
      key: 'shotcretePPE',
      description: 'Shotcrete PPE container with spare goggles, respirators, and diphoterine'
    },
    {
      key: 'sprayMechChecklist',
      description: 'Spray-mech and Agi pre-start checklist'
    },
    {
      key: 'exposedAreaScaled',
      description: 'Has the exposed area and face been adequately scaled by the jumbo?'
    },
    {
      key: 'workersInSupported',
      description: 'Workers working within a supported ground'
    },
    {
      key: 'chemicalHandling',
      description: 'Handling of shotcreting chemicals done well.'
    },
    {
      key: 'noPersonInFront',
      description: 'No person in front of jack legs or cab of a spraymech'
    },
    {
      key: 'hydroScaled',
      description: 'Has the area been adequately hydro-scaled?'
    },
    {
      key: 'areaInFrontDemarcated',
      description: 'Has the area in front of the jacks been demarcated for no entry?'
    },
    {
      key: 'correctThickness',
      description: 'Is the correct thickness of fibrecrete being applied?'
    },
    {
      key: 'correctDistance',
      description: 'Is the correct distance from the rock surface being maintained?'
    },
    {
      key: 'sprayingAngle',
      description: 'Is the angle of spraying close to 90° to the rock surface?'
    },
    {
      key: 'correctOverlap',
      description: 'Is the correct overlap between previously sprayed areas being maintained?'
    },
    {
      key: 'panelsSprayedQA',
      description: 'Have panels been sprayed for QA/QC?'
    },
    {
      key: 'depthChecks',
      description: 'Have the depth checks been carried out by the SWP (5 tabs per ring and 2m spacing between rings)?'
    },
    {
      key: 'supervisorInspected',
      description: 'Has a supervisor inspected the area before the machine moved to the following location?'
    },
    {
      key: 'correctChainage',
      description: 'Has the correct chainage been recorded for the area?'
    }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">

        {/* Date and Shift Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-600 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <FormInput
              label="DATE"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <div className="space-y-2">
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">SHIFT</label>
              <RadioGroup 
                name="shift"
                value={formData.shift}
                onChange={(value) => handleInputChange('shift', value)}
                options={[
                  { label: 'DAY', value: 'DAY' },
                  { label: 'NIGHT', value: 'NIGHT' }
                ]}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">CORRIDOR</label>
              <RadioGroup 
                name="corridor"
                value={formData.corridor}
                onChange={(value) => handleInputChange('corridor', value)}
                options={[
                  { label: 'NORTH', value: 'NORTH' },
                  { label: 'CENTRAL', value: 'CENTRAL' },
                  { label: 'SOUTH', value: 'SOUTH' }
                ]}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">TIME</label>
              <RadioGroup 
                name="time"
                value={formData.time}
                onChange={(value) => handleInputChange('time', value)}
                options={[
                  { label: '06:00-18:00', value: '06:00-18:00' },
                  { label: '18:00-06:00', value: '18:00-06:00' }
                ]}
              />
            </div>
          </div>
          
          <FormInput
            label="WORK AREA Chainage"
            value={formData.workAreaChainage}
            onChange={(e) => handleInputChange('workAreaChainage', e.target.value)}
          />
        </div>

        {/* Manning Section */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="MANNING" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FormInput
              label="Spraying Crew"
              value={formData.sprayingCrew}
              onChange={(e) => handleInputChange('sprayingCrew', e.target.value)}
            />
            <FormInput
              label="Operators"
              value={formData.operators}
              onChange={(e) => handleInputChange('operators', e.target.value)}
            />
            <FormInput
              label="Mine Captain"
              value={formData.mineCaptain}
              onChange={(e) => handleInputChange('mineCaptain', e.target.value)}
            />
            <FormInput
              label="Shift Boss"
              value={formData.shiftBoss}
              onChange={(e) => handleInputChange('shiftBoss', e.target.value)}
            />
            <FormInput
              label="Person In Charge"
              value={formData.personInCharge}
              onChange={(e) => handleInputChange('personInCharge', e.target.value)}
            />
          </div>
        </div>

        {/* Observation Checklist */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div className="space-y-0">
            {renderObservationHeader()}
            
            {observationItems.map(({ key, description }) => (
              <div key={key} className="grid grid-cols-12 gap-px mb-px">
                <TableCell className="col-span-5 font-medium text-gray-800 dark:text-gray-200 text-sm">
                  {description}
                </TableCell>
                <TableCell className="col-span-2">
                  <RadioGroup 
                    name={`observation_${key}`}
                    value={formData.observations[key]?.value || ''}
                    onChange={(value) => handleObservationChange(key, 'value', value)}
                    options={[
                      { label: 'YES', value: 'YES' },
                      { label: 'NO', value: 'NO' },
                      { label: 'N/A', value: 'N/A' }
                    ]}
                  />
                </TableCell>
                <TableCell className="col-span-5">
                  <TableInput 
                    value={formData.observations[key]?.comments || ''}
                    onChange={(e) => handleObservationChange(key, 'comments', e.target.value)}
                    placeholder="Enter comments..."
                  />
                </TableCell>
              </div>
            ))}
          </div>
        </div>

        {/* Observations and Recommendations */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <div className="space-y-6">
            <TextArea 
              label="Observations"
              value={formData.observationsText}
              onChange={(e) => handleInputChange('observationsText', e.target.value)}
              placeholder="Enter detailed observations..."
              rows={4}
            />
            
            <TextArea 
              label="Recommendations"
              value={formData.recommendations}
              onChange={(e) => handleInputChange('recommendations', e.target.value)}
              placeholder="Enter recommendations..."
              rows={4}
            />
          </div>
        </div>

        {/* Conducted By Section */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <SectionHeader title="CONDUCTED BY:" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput 
              label="Name"
              value={formData.conductedByName}
              onChange={(e) => handleInputChange('conductedByName', e.target.value)}
              className="text-lg py-3"
            />
            <FormInput 
              label="Signature"
              value={formData.conductedBySignature}
              onChange={(e) => handleInputChange('conductedBySignature', e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FibrecreteObservationForm;