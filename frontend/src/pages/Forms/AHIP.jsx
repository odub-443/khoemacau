// ActiveHeadingInspectionForm.jsx
import React, { useEffect, useState } from 'react';
import {
  FormInput,
  RadioGroup,
  SectionHeader,
  TableCell,
  TableInput,
  TextArea
} from './inputs';

const ActiveHeadingInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // General Information
    date: '',
    corridor: '',
    stope: '',
    pic: '',
    sBoss: '',
    currentStopeStatus: '',

    // SLT Firing Status + PF
    sltFiring: '',
    recovery: '',
    prodDrilling: '',
    pf1: false,
    pf2: false,
    pf3: false,

    // Pre-Blast Activities
    preBlastActivities: {
      safetyBund: { value: '', comments: '' },
      groundSupport: { value: '', comments: '' },
      slotRaiseProtection: { value: '', comments: '' },
      prodSlotDrilled: { value: '', comments: '' },
      drillDesignCompliance: { value: '', comments: '' },
      servicesRemoved: { value: '', comments: '' },
      meshCut: { value: '', comments: '' },
      accessChain: { value: '', comments: '' },
      rubbishRemoved: { value: '', comments: '' },
      explosivesReturned: { value: '', comments: '' }
    },

    // Ventilation + Signage
  ventilation: {
    tubeCondition: '',
    tubeDistToFace: '',
    airVelocity: '',
  },
  gasMonitor: {
    ch4: '',
    co: '',
    no2: '',
    co2: ''
  },
  signage: {
    placed: '',
    visible: '',
    pipeLabelling: '',
    done: ''
  },

    // Blasting Audit
    blastingAudit: {
      prepPlanCorrect: { value: '', comments: '' },
      holesPrepped: { value: '', comments: '' },
      emulsionDensities: { value: '', comments: '' },
      chargingLength: { value: '', comments: '' },
      picRecording: { value: '', comments: '' },
      detsTagged: { value: '', comments: '' },
      firingLineChecked: { value: '', comments: '' },
      timingAccordingToPlan: { value: '', comments: '' },
      blastConductedWell: { value: '', comments: '' }
    },

    // Ground Support
    groundSupport: {
      meshCutPrior: { status: '', comment: '' },
      browCablesCondition: { status: '', comment: '' },
      crownCablesCompleted: { status: '', comment: '' },
      sloughingExperienced: { status: '', comment: '' }
    },

    // Roadway Audit
    roadwayAudit: {
      graded: { status: '', comment: '' },
      drainageCondition: { status: '', comment: '' },
      flyDirtWindrows: { status: '', comment: '' }
    },

    // Mine Services
    mineServices: {
      autoMineCompleted: { status: '', comments: '' },
      electricalDBInstalled: { status: '', comments: '' },
      commsCableAvailable: { status: '', comments: '' }
    },

    // Ore Pass Inspection
    orePassInspection: {
      lightingAvail: '',
      stopLogCond: '',
      securingChain: '',
      signageInPlace: ''
    },

    // Active Stope Requirements
    activeStopeRequirements: {
      siteBarricadingDone: '',
      earthBundPlacement: '',
      floorConditionGood: '',
      stopBlogSecure: '',
      twoWayRadioCommsOk: '',
      ventilationConditionsOk: ''
    },

    // Comments + sign-off
    generalComments: '',
    inspectionConductedBy: '',
    signature: '',
    inspectionDate: ''
  });

  useEffect(()=>{
    onChange(formData)
  },[formData])

  // Generic setter that supports nested sections
  const handleInputChange = (section, field, value, subField = null) => {
    setFormData(prev => {
      // section === null -> top-level field
      if (!section) {
        return { ...prev, [field]: value };
      }

      // if subField provided, update nested object inside section[field][subField]
      if (subField) {
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
      }

      // update section.field directly (string value)
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  // small helpers for boolean checkboxes
  const toggleTopBool = (key, checked) => {
    setFormData(prev => ({ ...prev, [key]: checked }));
  };

  // quick submit for debugging / wire-up
  const handleSubmit = (e) => {
    e.preventDefault();
    // replace with real save hook
    console.log('AHI form payload:', formData);
    alert('Form submitted (check console).');
  };

  // arrays to drive table rows (keeps markup compact)
  const preBlastRows = [
    { key: 'safetyBund', label: '1.5m Safety Bund constructed?' },
    { key: 'groundSupport', label: 'Good ground support at brow?' },
    { key: 'slotRaiseProtection', label: 'Slot raise protection installed?' },
    { key: 'prodSlotDrilled', label: 'Prod/Slot drilled with 102mm bit?' },
    { key: 'drillDesignCompliance', label: 'Any non-compliance to drill design' },
    { key: 'servicesRemoved', label: 'Services removed to avoid damage' },
    { key: 'meshCut', label: 'Mesh cut to prevent damage?' },
    { key: 'accessChain', label: 'Unauthorized access chain in place' },
    { key: 'rubbishRemoved', label: 'Rubbish & tramp metals removed?' },
    { key: 'explosivesReturned', label: 'Excess Explosives returned?' }
  ];

  const blastingRows = [
    { key: 'prepPlanCorrect', label: 'Is the Prep or Charge Plan correct one?' },
    { key: 'holesPrepped', label: 'Are the holes prepped before charging' },
    { key: 'emulsionDensities', label: 'Emulsion densities taken & Ok?' },
    { key: 'chargingLength', label: 'Is charging length according to plan?' },
    { key: 'picRecording', label: 'Is the PIC recording the charge masses?' },
    { key: 'detsTagged', label: 'Has all the dets been tagged?' },
    { key: 'firingLineChecked', label: 'Has the Firing line checked & OK?' },
    { key: 'timingAccordingToPlan', label: 'Was timing done according to plan?' },
    { key: 'blastConductedWell', label: 'Was the blast conducted well?' }
  ];

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">

        {/* General Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-b border-gray-200 dark:border-gray-600 transition-colors">
          <SectionHeader title="General Information" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FormInput label="Date" type="date" value={formData.date} onChange={(e) => handleInputChange(null, 'date', e.target.value)} />
            <FormInput label="Corridor" value={formData.corridor} onChange={(e) => handleInputChange(null, 'corridor', e.target.value)} />
            <FormInput label="Stope" value={formData.stope} onChange={(e) => handleInputChange(null, 'stope', e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="PIC" value={formData.pic} onChange={(e) => handleInputChange(null, 'pic', e.target.value)} />
            <FormInput label="S/Boss" value={formData.sBoss} onChange={(e) => handleInputChange(null, 'sBoss', e.target.value)} />
            <FormInput label="Current Stope Status" value={formData.currentStopeStatus} onChange={(e) => handleInputChange(null, 'currentStopeStatus', e.target.value)} />
          </div>

          {/* SLT / PF row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">SLT Firing</label>
              <RadioGroup name="sltFiring" value={formData.sltFiring} onChange={(v) => handleInputChange(null, 'sltFiring', v)} options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Recovery</label>
              <RadioGroup name="recovery" value={formData.recovery} onChange={(v) => handleInputChange(null, 'recovery', v)} options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Prod. Drilling</label>
              <RadioGroup name="prodDrilling" value={formData.prodDrilling} onChange={(v) => handleInputChange(null, 'prodDrilling', v)} options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Panel Fired</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input type="checkbox" checked={formData.pf1} onChange={(e) => toggleTopBool('pf1', e.target.checked)} className="mr-2" /> PF 1
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" checked={formData.pf2} onChange={(e) => toggleTopBool('pf2', e.target.checked)} className="mr-2" /> PF 2
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" checked={formData.pf3} onChange={(e) => toggleTopBool('pf3', e.target.checked)} className="mr-2" /> PF 3
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Blast Activities */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="ACTIVE HEADING AUDIT" subtitle="Pre-Blast Activities" />
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-4">Pre-Blast Activities</TableCell>
            <TableCell isHeader className="col-span-2">Status</TableCell>
            <TableCell isHeader className="col-span-6">Comments</TableCell>
          </div>

          {preBlastRows.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-12 gap-px mb-px">
              <TableCell className="col-span-4 font-medium text-sm text-gray-800 dark:text-gray-200">{label}</TableCell>
              <TableCell className="col-span-2">
                <RadioGroup
                  name={`preBlast_${key}`}
                  value={formData.preBlastActivities[key]?.value || ''}
                  onChange={(v) => handleInputChange('preBlastActivities', key, v, 'value')}
                  options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                />
              </TableCell>
              <TableCell className="col-span-6">
                <TableInput
                  value={formData.preBlastActivities[key]?.comments || ''}
                  onChange={(e) => handleInputChange('preBlastActivities', key, e.target.value, 'comments')}
                  placeholder="Enter comments..."
                />
              </TableCell>
            </div>
          ))}

{/* Ventilation Panel */}
<div className="w-full">
  <TableCell isHeader className="mb-px">Ventilation</TableCell>
  <TableCell>
<div className="flex w-full space-x-4">
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
        {/* Blasting Audit */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="Active Heading Blasting Audit" subtitle="Prep, Charging, Tagging & Timing" />
          <div className="grid grid-cols-12 gap-px mb-px">
            <TableCell isHeader className="col-span-4">Activity</TableCell>
            <TableCell isHeader className="col-span-2">Status</TableCell>
            <TableCell isHeader className="col-span-6">Comments</TableCell>
          </div>

          {blastingRows.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-12 gap-px mb-px">
              <TableCell className="col-span-4 font-medium text-sm text-gray-800 dark:text-gray-200">{label}</TableCell>
              <TableCell className="col-span-2">
                <RadioGroup
                  name={`blasting_${key}`}
                  value={formData.blastingAudit[key]?.value || ''}
                  onChange={(v) => handleInputChange('blastingAudit', key, v, 'value')}
                  options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'N/A', value: 'N/A' }]}
                />
              </TableCell>
              <TableCell className="col-span-6">
                <TableInput
                  value={formData.blastingAudit[key]?.comments || ''}
                  onChange={(e) => handleInputChange('blastingAudit', key, e.target.value, 'comments')}
                  placeholder="Enter comments..."
                />
              </TableCell>
            </div>
          ))}
        </div>

        {/* Ground Support & Roadway */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div>
            <SectionHeader title="Ground Support" subtitle="(Check installation per contract schedules 5 & 6)" />
            <div className="grid grid-cols-12 gap-px mb-px">
              <TableCell isHeader className="col-span-6">Item (From Face)</TableCell>
              <TableCell isHeader className="col-span-3">Status</TableCell>
              <TableCell isHeader className="col-span-3">Comment</TableCell>
            </div>

            {Object.entries(formData.groundSupport).map(([key, val]) => {
              // derive label from key nicely
              const label = {
                meshCutPrior: 'Mesh cut prior to blasting?',
                browCablesCondition: 'Brow cables condition?',
                crownCablesCompleted: 'Crown cables completed?',
                sloughingExperienced: 'Sloughing experienced?'
              }[key] || key;

              return (
                <div key={key} className="grid grid-cols-12 gap-px mb-px">
                  <TableCell className="col-span-6 font-medium text-sm text-gray-800 dark:text-gray-200">{label}</TableCell>
                  <TableCell className="col-span-3">
                    <RadioGroup name={`${key}_status`} value={formData.groundSupport[key].status || ''} onChange={(v) => handleInputChange('groundSupport', key, v, 'status')} />
                  </TableCell>
                  <TableCell className="col-span-3">
                    <TableInput value={formData.groundSupport[key].comment || ''} onChange={(e) => handleInputChange('groundSupport', key, e.target.value, 'comment')} placeholder="Comment" />
                  </TableCell>
                </div>
              );
            })}
          </div>

          <div>
            <SectionHeader title="Roadway Audit" />
            <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div>
                <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300">Is it graded?</label>
                <RadioGroup name="graded" value={formData.roadwayAudit.graded.status || ''} onChange={(v) => handleInputChange('roadwayAudit', 'graded', v, 'status')} />
                <FormInput value={formData.roadwayAudit.graded.comment || ''} onChange={(e) => handleInputChange('roadwayAudit', 'graded', e.target.value, 'comment')} placeholder="Comment" />
              </div>

              <div>
                <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300">Water drainage condition?</label>
                <RadioGroup name="drainageCondition" value={formData.roadwayAudit.drainageCondition.status || ''} onChange={(v) => handleInputChange('roadwayAudit', 'drainageCondition', v, 'status')} />
                <FormInput value={formData.roadwayAudit.drainageCondition.comment || ''} onChange={(e) => handleInputChange('roadwayAudit', 'drainageCondition', e.target.value, 'comment')} placeholder="Comment" />
              </div>

              <div>
                <label className="text-xs block mb-1 text-gray-700 dark:text-gray-300">Any fly dirt or windrows?</label>
                <RadioGroup name="flyDirtWindrows" value={formData.roadwayAudit.flyDirtWindrows.status || ''} onChange={(v) => handleInputChange('roadwayAudit', 'flyDirtWindrows', v, 'status')} />
                <FormInput value={formData.roadwayAudit.flyDirtWindrows.comment || ''} onChange={(e) => handleInputChange('roadwayAudit', 'flyDirtWindrows', e.target.value, 'comment')} placeholder="Comment" />
              </div>
            </div>
          </div>
        </div>

        {/* Mine Services & Ore Pass */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <SectionHeader title="Mine Services Audit" subtitle="(Check installation per contract schedules 5 & 6)" />
              <div className="grid grid-cols-12 gap-px mb-px">
                <TableCell isHeader className="col-span-6">Mine Services</TableCell>
                <TableCell isHeader className="col-span-3">Status</TableCell>
                <TableCell isHeader className="col-span-3">Comments</TableCell>
              </div>

              {Object.entries(formData.mineServices).map(([key]) => {
                const label = {
                  autoMineCompleted: 'Auto-mine completed?',
                  electricalDBInstalled: 'Electrical DB installed?',
                  commsCableAvailable: 'Comms Cable Available?'
                }[key] || key;

                return (
                  <div key={key} className="grid grid-cols-12 gap-px mb-px">
                    <TableCell className="col-span-6 font-medium text-sm text-gray-800 dark:text-gray-200">{label}</TableCell>
                    <TableCell className="col-span-3">
                      <RadioGroup name={`${key}_status`} value={formData.mineServices[key].status || ''} onChange={(v) => handleInputChange('mineServices', key, v, 'status')} />
                    </TableCell>
                    <TableCell className="col-span-3">
                      <TableInput value={formData.mineServices[key].comments || ''} onChange={(e) => handleInputChange('mineServices', key, e.target.value, 'comments')} placeholder="Comments" />
                    </TableCell>
                  </div>
                );
              })}
            </div>

            <div>
              <SectionHeader title="Ore Pass Inspection" />
              <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <FormInput label="Lighting avail." value={formData.orePassInspection.lightingAvail} onChange={(e) => handleInputChange('orePassInspection', 'lightingAvail', e.target.value)} />
                <FormInput label="Stop Log cond." value={formData.orePassInspection.stopLogCond} onChange={(e) => handleInputChange('orePassInspection', 'stopLogCond', e.target.value)} />
                <FormInput label="Securing chain" value={formData.orePassInspection.securingChain} onChange={(e) => handleInputChange('orePassInspection', 'securingChain', e.target.value)} />
                <FormInput label="Signage in place" value={formData.orePassInspection.signageInPlace} onChange={(e) => handleInputChange('orePassInspection', 'signageInPlace', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Active Stope Requirements */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="Active Stope Requirements" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Site Barricading Done?</label>
              <RadioGroup name="siteBarricadingDone" value={formData.activeStopeRequirements.siteBarricadingDone} onChange={(v) => handleInputChange('activeStopeRequirements', 'siteBarricadingDone', v)} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Earth Bund Placement</label>
              <RadioGroup name="earthBundPlacement" value={formData.activeStopeRequirements.earthBundPlacement} onChange={(v) => handleInputChange('activeStopeRequirements', 'earthBundPlacement', v)} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Floor condition good?</label>
              <RadioGroup name="floorConditionGood" value={formData.activeStopeRequirements.floorConditionGood} onChange={(v) => handleInputChange('activeStopeRequirements', 'floorConditionGood', v)} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Stop Blog secure?</label>
              <RadioGroup name="stopBlogSecure" value={formData.activeStopeRequirements.stopBlogSecure} onChange={(v) => handleInputChange('activeStopeRequirements', 'stopBlogSecure', v)} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">2-Way Radio Comms Ok?</label>
              <RadioGroup name="twoWayRadioCommsOk" value={formData.activeStopeRequirements.twoWayRadioCommsOk} onChange={(v) => handleInputChange('activeStopeRequirements', 'twoWayRadioCommsOk', v)} />
            </div>
            <div>
              <label className="font-medium text-sm text-gray-900 dark:text-gray-100">Ventilation conditions Ok?</label>
              <RadioGroup name="ventilationConditionsOk" value={formData.activeStopeRequirements.ventilationConditionsOk} onChange={(v) => handleInputChange('activeStopeRequirements', 'ventilationConditionsOk', v)} />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <TextArea label="Comments" value={formData.generalComments} onChange={(e) => handleInputChange(null, 'generalComments', e.target.value)} rows={5} placeholder="Enter any general comments or observations..." />
        </div>

        {/* Sign-off */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput label="Inspection Conducted By" value={formData.inspectionConductedBy} onChange={(e) => handleInputChange(null, 'inspectionConductedBy', e.target.value)} />
            <FormInput label="Signature" value={formData.signature} onChange={(e) => handleInputChange(null, 'signature', e.target.value)} />
            <FormInput label="Inspection Date" type="date" value={formData.inspectionDate} onChange={(e) => handleInputChange(null, 'inspectionDate', e.target.value)} />
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded shadow">
              Save / Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ActiveHeadingInspectionForm;
