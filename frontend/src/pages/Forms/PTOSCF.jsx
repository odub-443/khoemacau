import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, RadioGroup, TextArea } from './inputs';

const PTOStopeChargingForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // General Information
    date: '',
    productionFiringNumber: '',
    corridor: '',
    chargingRings: '',
    stope: '',
    type: '', // Slot/Production/Recovery
    
    // Charging Crew
    productionPic: '',
    blaster: '',
    expertChargeUp: '',
    aeciPersonnel: '',
    
    // Safety Audit
    safety: {
      signage: { value: '', comments: '' },
      safetyBerm: { value: '', comments: '' },
      swic: { value: '', comments: '' },
      chargeRig: { value: '', comments: '' },
      earthStrap: { value: '', comments: '' },
      fallArrestEquipment: { value: '', comments: '' },
      explosivesCare: { value: '', comments: '' },
      checkScaling: { value: '', comments: '' },
      peopleSafety: { value: '', comments: '' },
      browCables: { value: '', comments: '' }
    },
    
    // Pre-Charging Audit
    preCharging: {
      rightChargeSheet: { value: '', comments: '' },
      chargePlanReviewed: { value: '', comments: '' },
      chargePlanMatchesDrilling: { value: '', comments: '' },
      holesCleanedAndMeasured: { value: '', comments: '' },
      preppingDone: { value: '', comments: '' },
      levelAboveBarricaded: { value: '', comments: '' },
      holesIdentifiedAndCleaned: { value: '', comments: '' },
      holesOutOfToleranceMarked: { value: '', comments: '' },
      firingLineChecked: { value: '', comments: '' },
      emulsionDensity: { value: '', comments: '' }
    },

    // Charging & Tagging Audit
    chargingTagging: {
      primersMadeAtFace: { value: '', comments: '' },
      spidersInserted: { value: '', comments: '' },
      fallArrestUsed: { value: '', comments: '' },
      primersAsPerPlan: { value: '', comments: '' },
      unchargedLengthAdheredTo: { value: '', comments: '' },
      holesIdentifiedAndTagged: { value: '', comments: '' }
    },

    // Post Charging Audit
    postCharging: {
      allHolesCharged: { value: '', comments: '' },
      holesRecharged: { value: '', comments: '' },
      chargingPointsFlushed: { value: '', comments: '' },
      areaCleaned: { value: '', comments: '' },
      explosivesReturned: { value: '', comments: '' },
      allHazardsRemoved: { value: '', comments: '' }
    },
    
    // Closing
    generalComments: '',
    signature: '',
    completedBy: '',
    dateSigned: ''
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
        <TableCell isHeader className="col-span-5">Safety Item</TableCell>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <FormInput
              label="Date of Inspection"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <FormInput
              label="Production Firing Number"
              value={formData.productionFiringNumber}
              onChange={(e) => handleInputChange('productionFiringNumber', e.target.value)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormInput
              label="Charging Rings"
              value={formData.chargingRings}
              onChange={(e) => handleInputChange('chargingRings', e.target.value)}
            />
            <FormInput
              label="Type (Slot/Prod/Recovery)"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            />
          </div>

          <SectionHeader title="Charging Crew" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormInput
              label="Production PIC"
              value={formData.productionPic}
              onChange={(e) => handleInputChange('productionPic', e.target.value)}
            />
            <FormInput
              label="Blaster"
              value={formData.blaster}
              onChange={(e) => handleInputChange('blaster', e.target.value)}
            />
            <FormInput
              label="Expert Charge Up"
              value={formData.expertChargeUp}
              onChange={(e) => handleInputChange('expertChargeUp', e.target.value)}
            />
            <FormInput
              label="AECI Personnel"
              value={formData.aeciPersonnel}
              onChange={(e) => handleInputChange('aeciPersonnel', e.target.value)}
            />
          </div>
        </div>

        {/* Safety Audit Section */}
        {renderAuditTable("Safety", "safety", [
          { key: 'signage', label: 'Signage: Safety barricade installed with the right signage?' },
          { key: 'safetyBerm', label: 'Safety Berm: Has it been installed to specification (1/3)?' },
          { key: 'swic', label: 'SWIC: Has it been completed prior to commencement of work?' },
          { key: 'chargeRig', label: 'Charge Rig: Has it been parked on extended jacks?' },
          { key: 'earthStrap', label: 'Earth Strap: ensure its installed and earthed to the ground?' },
          { key: 'fallArrestEquipment', label: 'Fall Arrest Equipment: Is it available & in good condition?' },
          { key: 'explosivesCare', label: 'Explosives Care: Are they stored as per the act requirements?' },
          { key: 'checkScaling', label: 'Check Scaling: Has it been done prior to charging?' },
          { key: 'peopleSafety', label: 'People Safety: No person is to go under a raised work basket?' },
          { key: 'browCables', label: 'Brow Cables: Are they installed, plated & tensioned prior blast?' }
        ])}

        {/* Pre-Charging Audit Section */}
        {renderAuditTable("Pre-Charging", "preCharging", [
          { key: 'rightChargeSheet', label: 'Is the charging crew having the right charge sheet?' },
          { key: 'chargePlanReviewed', label: 'Has the charge plan been reviewed by the crew?' },
          { key: 'chargePlanMatchesDrilling', label: 'Does the charge plan match the drilling pattern?' },
          { key: 'holesCleanedAndMeasured', label: 'Clean the holes and take measurement of holes?' },
          { key: 'preppingDone', label: 'Has prepping been done and holes numbered correctly?' },
          { key: 'levelAboveBarricaded', label: 'Ensure the level above is barricaded to prevent access?' },
          { key: 'holesIdentifiedAndCleaned', label: 'Have all the holes to be charged been identified & cleaned?' },
          { key: 'holesOutOfToleranceMarked', label: 'All holes out of tolerance been marked & identified?' },
          { key: 'firingLineChecked', label: 'Firing line been checked for leakages, prior blasting?' },
          { key: 'emulsionDensity', label: 'Has the emulsion density been taken, and ready to be used?' }
        ])}
        
        {/* Charging & Tagging Audit Section */}
        {renderAuditTable("Charging & Tagging", "chargingTagging", [
          { key: 'primersMadeAtFace', label: 'Primers to be always made at the face?' },
          { key: 'spidersInserted', label: 'Ensure spiders are inserted to hold up emulsion and primers?' },
          { key: 'fallArrestUsed', label: 'Does the charge up crew use the fall arrest equipment when charging?' },
          { key: 'primersAsPerPlan', label: 'Are the primers being inserted as per the charge plan?' },
          { key: 'unchargedLengthAdheredTo', label: 'Are the uncharged column length being adhered to?' },
          { key: 'holesIdentifiedAndTagged', label: 'Have all holes been identified and tagged?' }
        ])}

        {/* Post Charging Audit Section */}
        {renderAuditTable("Post Charging", "postCharging", [
          { key: 'allHolesCharged', label: 'After charging, have all holes been charged?' },
          { key: 'holesRecharged', label: 'Were any holes recharged, if so which ones?' },
          { key: 'chargingPointsFlushed', label: 'All charging points been flushed?' },
          { key: 'areaCleaned', label: 'Has the area been cleaned of all foreign objects and tramp metals?' },
          { key: 'explosivesReturned', label: 'Are all explosives returned to the explosive truck, magazine and safe?' },
          { key: 'allHazardsRemoved', label: 'Have all other hazards been identified and removed from the area?' }
        ])}

        {/* Closing Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="Closing Information" />
          <TextArea
            label="General Comments"
            value={formData.generalComments}
            onChange={(e) => handleInputChange('generalComments', e.target.value)}
            placeholder="Enter any general comments or observations..."
            className="mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="Completed By"
              value={formData.completedBy}
              onChange={(e) => handleInputChange('completedBy', e.target.value)}
            />
            <FormInput
              label="Signature"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
            />
            <FormInput
              label="Date"
              type="date"
              value={formData.dateSigned}
              onChange={(e) => handleInputChange('dateSigned', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTOStopeChargingForm;
