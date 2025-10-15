import React, { useEffect, useState } from 'react';
import { FormInput, RadioGroup, SectionHeader, TableCell, TableInput, TextArea } from './inputs';

const DAHIForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // General Information
    date: '',
    corridor: '',
    heading: '',
    afcNo: '',
    afcChainage: { from: '', to: '' },
    currentFacePosition: '',
    
    // Active Heading Profile Audit
    chainageRows: Array(8).fill().map(() => ({
      chainage: '',
      width: '',
      height: '',
      grade: '',
      testBolts: '',
      comments: ''
    })),
    
    // Ventilation
    tubeCondition: '',
    tubeDistToFace: '',
    airVelocity: '',
    gasMonitor: { ch4: '', co: '', no2: '', co2: '' },
    signage: { placed: '', visible: '', pipeLabelling: '', done: '' },
    
    // Mine Services Audit
    mineServices: {
      waterAirPipes: { complying: '', distToFace: '', nonCompliance: '' },
      droppersValves: { complying: '', distToFace: '', nonCompliance: '' },
      dewateringPipe: { complying: '', distToFace: '', nonCompliance: '' },
      pipeSupport: { complying: '', distToFace: '', nonCompliance: '' },
      electricalCables: { complying: '', distToFace: '', nonCompliance: '' },
      commsCable: { complying: '', distToFace: '', nonCompliance: '' },
      blastingCable: { complying: '', distToFace: '', nonCompliance: '' },
      gradeLineMarking: { complying: '', distToFace: '', nonCompliance: '' },
      chainageMarking: { complying: '', distToFace: '', nonCompliance: '' }
    },
    
    // Ground Support
    groundSupport: {
      meshSplitSets: { complying: '', comment: '' },
      resinBolts: { complying: '', comment: '' },
      nameProfileType: { complying: '', comment: '' },
      fromGradeLine: { complying: '', comment: '' }
    },
    
    // Roadway
    roadway: { type: '', status: '', drainage: '', graded: '' },
    
    // Activity Description and Comments
    activityDescription: '',
    ptoDone: '',
    generalComments: '',
    
    // Signature section
    inspectedBy: '',
    signature: '',
    signatureDate: ''
  });

  useEffect(()=>{
    onChange(formData)
  },[formData])

  const handleInputChange = (section, field, value, subField = null) => {
    setFormData(prev => {
      if (section && subField) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: value
            }
          }
        };
      } else if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  const handleChainageRowChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      chainageRows: prev.chainageRows.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">
        
        {/* General Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
          <h2 className="font-bold text-xl mb-6 text-gray-900 dark:text-gray-100 transition-colors">General Information</h2>
          
          {/* First row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FormInput
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange(null, 'date', e.target.value)}
            />
            <FormInput
              label="Corridor"
              value={formData.corridor}
              onChange={(e) => handleInputChange(null, 'corridor', e.target.value)}
            />
            <FormInput
              label="Heading"
              value={formData.heading}
              onChange={(e) => handleInputChange(null, 'heading', e.target.value)}
            />
          </div>

          {/* Second row - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormInput
              label="AFC No"
              value={formData.afcNo}
              onChange={(e) => handleInputChange(null, 'afcNo', e.target.value)}
            />
            <FormInput
              label="AFC Chainage From"
              value={formData.afcChainage.from}
              onChange={(e) => handleInputChange('afcChainage', 'from', e.target.value)}
            />
            <FormInput
              label="AFC Chainage To"
              value={formData.afcChainage.to}
              onChange={(e) => handleInputChange('afcChainage', 'to', e.target.value)}
            />
            <FormInput
              label="Current Face Position"
              value={formData.currentFacePosition}
              onChange={(e) => handleInputChange(null, 'currentFacePosition', e.target.value)}
            />
          </div>
        </div>

        {/* Active Heading Profile Audit */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="Active Heading Profile Audit" />
          
          <div className="flex gap-4">
            {/* Main Table */}
            <div className="flex-1">
              {/* Table Headers */}
              <div className="grid grid-cols-6 gap-px mb-px">
                <TableCell isHeader>Chainage</TableCell>
                <TableCell isHeader>Width</TableCell>
                <TableCell isHeader>Height</TableCell>
                <TableCell isHeader>Grade</TableCell>
                <TableCell isHeader>Test Bolts</TableCell>
                <TableCell isHeader>Comments</TableCell>
              </div>
              
              {/* Table Rows */}
              {formData.chainageRows.map((row, index) => (
                <div key={index} className="grid grid-cols-6 gap-px mb-px">
                  <TableCell>
                    <TableInput 
                      value={row.chainage}
                      onChange={(e) => handleChainageRowChange(index, 'chainage', e.target.value)}
                      placeholder="Enter chainage"
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={row.width}
                      onChange={(e) => handleChainageRowChange(index, 'width', e.target.value)}
                      placeholder="Width"
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={row.height}
                      onChange={(e) => handleChainageRowChange(index, 'height', e.target.value)}
                      placeholder="Height"
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={row.grade}
                      onChange={(e) => handleChainageRowChange(index, 'grade', e.target.value)}
                      placeholder="Grade"
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={row.testBolts}
                      onChange={(e) => handleChainageRowChange(index, 'testBolts', e.target.value)}
                      placeholder="Test bolts"
                    />
                  </TableCell>
                  <TableCell>
                    <TableInput 
                      value={row.comments}
                      onChange={(e) => handleChainageRowChange(index, 'comments', e.target.value)}
                      placeholder="Comments"
                    />
                  </TableCell>
                </div>
              ))}
            </div>

            {/* Ventilation Panel */}
            <div className="w-80">
              <TableCell isHeader className="mb-px">Ventilation</TableCell>
              <TableCell>
                <div className="space-y-4">
                  {/* Ventilation Details */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-colors">
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors">Ventilation Details</div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">Tube Condition</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.tubeCondition}
                          onChange={(e) => handleInputChange(null, 'tubeCondition', e.target.value)} 
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">Tube dist. to face</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.tubeDistToFace}
                          onChange={(e) => handleInputChange(null, 'tubeDistToFace', e.target.value)} 
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">Air Velocity (0.05m/s)</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.airVelocity}
                          onChange={(e) => handleInputChange(null, 'airVelocity', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Gas Monitor Reading */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-colors">
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors">Gas Monitor Reading</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">CH4 %</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.gasMonitor.ch4}
                          onChange={(e) => handleInputChange('gasMonitor', 'ch4', e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">CO ppm</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.gasMonitor.co}
                          onChange={(e) => handleInputChange('gasMonitor', 'co', e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">NO2 ppm</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.gasMonitor.no2}
                          onChange={(e) => handleInputChange('gasMonitor', 'no2', e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">CO2 %</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                          value={formData.gasMonitor.co2}
                          onChange={(e) => handleInputChange('gasMonitor', 'co2', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Signage */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-colors">
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors">Signage</div>
                    <div className="space-y-2">
                      {Object.entries({
                        'Placed': 'placed',
                        'Visible': 'visible',
                        'Pipe Labelling': 'pipeLabelling',
                        'Done': 'done'
                      }).map(([label, key]) => (
                        <div key={key}>
                          <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300 transition-colors">{label}</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                            value={formData.signage[key]}
                            onChange={(e) => handleInputChange('signage', key, e.target.value)} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TableCell>
            </div>
          </div>
        </div>

        {/* Mine Services Audit */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader 
            title="Mine Services Audit" 
            subtitle="(Check if the installation is according to schedule 5 & 6 of the Contract) See back page"
          />
          
          {/* Headers */}
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-4">Item</TableCell>
            <TableCell isHeader className="col-span-2">Complying to Std?</TableCell>
            <TableCell isHeader className="col-span-2">Dist. to Face</TableCell>
            <TableCell isHeader className="col-span-4">Describe Non-Compliance</TableCell>
          </div>

          {Object.entries({
            'Water & Air Pipes': 'waterAirPipes',
            'Droppers & Valves': 'droppersValves',
            'Dewatering pipe': 'dewateringPipe',
            'Pipe Support': 'pipeSupport',
            'Electrical Cables': 'electricalCables',
            'Comms Cable': 'commsCable',
            'Blasting Cable': 'blastingCable',
            'Grade Line Marking': 'gradeLineMarking',
            'Chainage Marking': 'chainageMarking'
          }).map(([label, key]) => (
            <div key={key} className="grid grid-cols-12 gap-px mb-px">
              <TableCell className="col-span-4 font-medium text-gray-800 dark:text-gray-200">{label}</TableCell>
              <TableCell className="col-span-2">
                <RadioGroup 
                  name={`${key}_complying`}
                  value={formData.mineServices[key]?.complying || ''}
                  onChange={(value) => handleInputChange('mineServices', key, value, 'complying')}
                />
              </TableCell>
              <TableCell className="col-span-2">
                <TableInput 
                  value={formData.mineServices[key]?.distToFace || ''}
                  onChange={(e) => handleInputChange('mineServices', key, e.target.value, 'distToFace')}
                  placeholder="Distance"
                />
              </TableCell>
              <TableCell className="col-span-4">
                <TableInput 
                  value={formData.mineServices[key]?.nonCompliance || ''}
                  onChange={(e) => handleInputChange('mineServices', key, e.target.value, 'nonCompliance')}
                  placeholder="Describe any non-compliance"
                />
              </TableCell>
            </div>
          ))}
        </div>

        {/* Ground Support and Roadway */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          
          {/* Ground Support */}
          <div>
            <SectionHeader 
              title="Ground Support" 
              subtitle="(Check if the installation is according to schedule 5 & 6 of the Contract) See back page"
            />
            
            <div className="grid grid-cols-12 gap-px mb-px">
              <TableCell isHeader className="col-span-5">Item (From Face)</TableCell>
              <TableCell isHeader className="col-span-3">Complying to Std</TableCell>
              <TableCell isHeader className="col-span-4">Comment</TableCell>
            </div>

            {Object.entries({
              'Mesh & Split Sets': 'meshSplitSets',
              'Resin Bolts': 'resinBolts',
              'Name Profile Type': 'nameProfileType',
              'From Grade line': 'fromGradeLine'
            }).map(([label, key]) => (
              <div key={key} className="grid grid-cols-12 gap-px mb-px">
                <TableCell className="col-span-5 font-medium text-gray-800 dark:text-gray-200">{label}</TableCell>
                <TableCell className="col-span-3">
                  <RadioGroup 
                    name={`${key}_complying`}
                    value={formData.groundSupport[key]?.complying || ''}
                    onChange={(value) => handleInputChange('groundSupport', key, value, 'complying')}
                  />
                </TableCell>
                <TableCell className="col-span-4">
                  <TableInput 
                    value={formData.groundSupport[key]?.comment || ''}
                    onChange={(e) => handleInputChange('groundSupport', key, e.target.value, 'comment')}
                    placeholder="Comment"
                  />
                </TableCell>
              </div>
            ))}
          </div>

          {/* Roadway */}
          <div>
            <SectionHeader title="Roadway" />
            <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-colors">
              {Object.entries({
                'Type': 'type',
                'Status': 'status',
                'Drainage': 'drainage',
                'Graded': 'graded'
              }).map(([label, key]) => (
                <FormInput 
                  key={key}
                  label={label}
                  value={formData.roadway[key]}
                  onChange={(e) => handleInputChange('roadway', key, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Activity Description and PTO Done */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div>
            <TextArea 
              label="Active Heading Activity Description"
              value={formData.activityDescription}
              onChange={(e) => handleInputChange(null, 'activityDescription', e.target.value)}
              placeholder="Describe the activities performed..."
              rows={4}
            />
          </div>
          <div>
            <TextArea 
              label="PTO Done"
              value={formData.ptoDone}
              onChange={(e) => handleInputChange(null, 'ptoDone', e.target.value)}
              placeholder="List completed PTO items..."
              rows={4}
            />
          </div>
        </div>

        {/* General Comments */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <TextArea 
            label="General Comments"
            value={formData.generalComments}
            onChange={(e) => handleInputChange(null, 'generalComments', e.target.value)}
            placeholder="Add any additional comments or observations..."
            rows={4}
          />
        </div>

        {/* Signature Section */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormInput 
              label="Inspection Conducted By"
              value={formData.inspectedBy}
              onChange={(e) => handleInputChange(null, 'inspectedBy', e.target.value)}
              className="text-lg py-3"
            />
            <FormInput 
              label="Signature"
              value={formData.signature}
              onChange={(e) => handleInputChange(null, 'signature', e.target.value)}
              className="text-lg py-3"
            />
            <FormInput 
              label="Date"
              type="date"
              value={formData.signatureDate}
              onChange={(e) => handleInputChange(null, 'signatureDate', e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DAHIForm;