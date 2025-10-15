import React, { useEffect, useState } from 'react';
import { FormInput, SectionHeader, TableCell, TextArea, ComplianceRow } from './inputs';

const DrillingInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||{
    // Section 1 - General Information
    date: '',
    drillRigNo: '',
    location: '',
    time: '',
    inspectedBy: '',
    
    // Section 2 - PPE (Behavioural)
    ppe: {
      earProtection: { na: false, yes: false, no: false, comments: '' },
      gloves: { na: false, yes: false, no: false, comments: '' },
      hardhat: { na: false, yes: false, no: false, comments: '' },
      overalls: { na: false, yes: false, no: false, comments: '' },
      safetyBoots: { na: false, yes: false, no: false, comments: '' },
      safetyGlasses: { na: false, yes: false, no: false, comments: '' },
      dustMask: { na: false, yes: false, no: false, comments: '' },
      safetyHarness: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 3 - Work Area
    workArea: {
      inspectedByPIC: { na: false, yes: false, no: false, comments: '' },
      tripHazards: { na: false, yes: false, no: false, comments: '' },
      freeFromSlippery: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 4 - Drill Rig
    drillRig: {
      inspectionChecklist: { na: false, yes: false, no: false, comments: '' },
      equipmentCondition: { na: false, yes: false, no: false, comments: '' },
      hazardousPartsGuarded: { na: false, yes: false, no: false, comments: '' },
      whipChecksSecure: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 5 - Environmental
    environmental: {
      wasteControlled: { na: false, yes: false, no: false, comments: '' },
      spillagesControlled: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 6 - Demarcation
    demarcation: {
      accessExitRoutes: { na: false, yes: false, no: false, comments: '' },
      workAreaSumps: { na: false, yes: false, no: false, comments: '' },
      barricadingCondition: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 7 - Housekeeping
    housekeeping: {
      workingAreaClean: { na: false, yes: false, no: false, comments: '' },
      noRedundantMaterials: { na: false, yes: false, no: false, comments: '' },
      toolsStored: { na: false, yes: false, no: false, comments: '' },
      adequateStorage: { na: false, yes: false, no: false, comments: '' },
      drillRodsStacked: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 8 - Face Preparation
    facePreparation: {
      faceClearedMisfires: { na: false, yes: false, no: false, comments: '' },
      socketsIdentified: { na: false, yes: false, no: false, comments: '' },
      faceHolesMarked: { na: false, yes: false, no: false, comments: '' },
      faceMarkedSurvey: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 9 - Ground Support
    groundSupport: {
      shotcretedResinBolt: { na: false, yes: false, no: false, comments: '' },
      meshSplitSets: { na: false, yes: false, no: false, comments: '' },
      supportToStandard: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 10 - Drilling
    drilling: {
      jumboCableSupported: { na: false, yes: false, no: false, comments: '' },
      dangerSignDisplayed: { na: false, yes: false, no: false, comments: '' },
      jumboUnderSupport: { na: false, yes: false, no: false, comments: '' },
      frontJacksDelineated: { na: false, yes: false, no: false, comments: '' },
      scaleFromSide: { na: false, yes: false, no: false, comments: '' },
      noOperationNipper: { na: false, yes: false, no: false, comments: '' },
      noDrilling15cm: { na: false, yes: false, no: false, comments: '' }
    },
    
    // Section 11 - General Comments
    generalComments: '',
    completedBy: '',
    signature: ''
  });

  useEffect(()=>{
    onChange(formData)
  },[formData])
  const handleComplianceChange = (section, item, field, value) => {
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderComplianceHeader = () => (
    <div className="grid grid-cols-12 gap-px mb-px">
      <TableCell isHeader className="col-span-3">Description of Condition</TableCell>
      <TableCell isHeader className="col-span-3">Compliance</TableCell>
      <TableCell isHeader className="col-span-6">Comments</TableCell>
    </div>
  );

  const renderSection = (sectionData, sectionKey, items) => (
    <div className="space-y-0">
      {renderComplianceHeader()}
      {items.map(({ key, label }) => (
        <ComplianceRow
          key={key}
          name={`${sectionKey}_${key}`}
          description={label}
          value={sectionData[key]?.value}
          comments={sectionData[key]?.comments}
          onValueChange={(value) => handleComplianceChange(sectionKey, key, 'value', value)}
          onCommentsChange={(e) => handleComplianceChange(sectionKey, key, 'comments', e.target.value)}
        />
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors">

        {/* Section 1 - General Information */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b-4 border-gray-300 dark:border-gray-600 transition-colors">
          <SectionHeader title="SECTION 1 - GENERAL INFORMATION" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput
              label="DATE"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
            <FormInput
              label="DRILL RIG NO"
              value={formData.drillRigNo}
              onChange={(e) => handleInputChange('drillRigNo', e.target.value)}
            />
            <FormInput
              label="LOCATION"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <FormInput
              label="TIME"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
            <FormInput
              label="INSPECTED BY"
              value={formData.inspectedBy}
              onChange={(e) => handleInputChange('inspectedBy', e.target.value)}
            />
          </div>
        </div>

        {/* Section 2 - PPE (Behavioural) */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader 
            title="SECTION 2 - PPE (Behavioural)" 
            subtitle="All using appropriate PPE and in good condition?"
          />
          
          {renderSection(formData.ppe, 'ppe', [
            { key: 'earProtection', label: '1. Ear Protection' },
            { key: 'gloves', label: '2. Gloves' },
            { key: 'hardhat', label: '3. Hardhat' },
            { key: 'overalls', label: '4. Overalls' },
            { key: 'safetyBoots', label: '5. Safety Boots' },
            { key: 'safetyGlasses', label: '6. Safety Glasses' },
            { key: 'dustMask', label: '7. Dust Mask' },
            { key: 'safetyHarness', label: '8. Safety Harness' }
          ])}
        </div>

        {/* Section 3 - Work Area */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="SECTION 3 - WORK AREA" />
          
          {renderSection(formData.workArea, 'workArea', [
            { key: 'inspectedByPIC', label: '1. Has it been inspected by the appointed PIC?' },
            { key: 'tripHazards', label: '2. Trip or other obstruction hazards?' },
            { key: 'freeFromSlippery', label: '3. Free from slippery substances?' }
          ])}
        </div>

        {/* Section 4 - Drill Rig */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="SECTION 4 - DRILL RIG" />
          
          {renderSection(formData.drillRig, 'drillRig', [
            { key: 'inspectionChecklist', label: '1. Inspection checklist conducted?' },
            { key: 'equipmentCondition', label: '2. Equipment in good condition?' },
            { key: 'hazardousPartsGuarded', label: '3. All hazardous machine parts guarded?' },
            { key: 'whipChecksSecure', label: '4. Whip checks on all air hoses secure?' }
          ])}
        </div>

        {/* Section 5 - Environmental */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="SECTION 5 - ENVIRONMENTAL" />
          
          {renderSection(formData.environmental, 'environmental', [
            { key: 'wasteControlled', label: '1. Waste/rubbish adequately controlled?' },
            { key: 'spillagesControlled', label: '2. Oil/Hazardous Substance Spillages controlled?' }
          ])}
        </div>

        {/* Section 6 - Demarcation */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="SECTION 6 - DEMARCATION" />
          
          {renderSection(formData.demarcation, 'demarcation', [
            { key: 'accessExitRoutes', label: '1. Access and exit routes demarcated?' },
            { key: 'workAreaSumps', label: '2. Demarcation around work area and sumps?' },
            { key: 'barricadingCondition', label: '3. Demarcation/Barricading in good condition?' }
          ])}
        </div>

        {/* Section 7 - Housekeeping */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="SECTION 7 - HOUSEKEEPING" />
          
          {renderSection(formData.housekeeping, 'housekeeping', [
            { key: 'workingAreaClean', label: '1. Working area clean and tidy?' },
            { key: 'noRedundantMaterials', label: '2. No redundant materials?' },
            { key: 'toolsStored', label: '3. Tools and Items stored away after use?' },
            { key: 'adequateStorage', label: '4. Adequate storing space?' },
            { key: 'drillRodsStacked', label: '5. Stacking of drill rods safe?' }
          ])}
        </div>

        {/* Section 8 - Face Preparation */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="SECTION 8 - FACE PREPARATION" />
          
          {renderSection(formData.facePreparation, 'facePreparation', [
            { key: 'faceClearedMisfires', label: '1. Is the face been cleared of misfires?' },
            { key: 'socketsIdentified', label: '2. Are the sockets identified and cleaned?' },
            { key: 'faceHolesMarked', label: '3. Is the face holes marked correctly?' },
            { key: 'faceMarkedSurvey', label: '4. Is the face marked according to survey MI?' }
          ])}
        </div>

        {/* Section 9 - Ground Support */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="SECTION 9 - GROUND SUPPORT" />
          
          {renderSection(formData.groundSupport, 'groundSupport', [
            { key: 'shotcretedResinBolt', label: '1. Is the heading shotcreted & resin bolt installed?' },
            { key: 'meshSplitSets', label: '2. Is the heading supported with mesh & split sets?' },
            { key: 'supportToStandard', label: '3. Is the ground support to standard?' }
          ])}
        </div>

        {/* Section 10 - Drilling */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transition-colors">
          <SectionHeader title="SECTION 10 - DRILLING" />
          
          {renderSection(formData.drilling, 'drilling', [
            { key: 'jumboCableSupported', label: '1. Is the Jumbo cable supported on L-Pins?' },
            { key: 'dangerSignDisplayed', label: '2. "DANGER-Trailing Cable" sign displayed?' },
            { key: 'jumboUnderSupport', label: '3. Is the Jumbo set under supported ground?' },
            { key: 'frontJacksDelineated', label: '4. Front Jacks delineated on both sides (cones)?' },
            { key: 'scaleFromSide', label: '5. Scale from side to side, starting at the bottom?' },
            { key: 'noOperationNipper', label: '6. No operation permitted when nipper is in front?' },
            { key: 'noDrilling15cm', label: '7. No drilling to take place within 15cm of any socket?' }
          ])}
        </div>

        {/* Section 11 - General Comments */}
        <div className="p-6 border-b-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 transition-colors">
          <SectionHeader title="SECTION 11 - GENERAL COMMENTS" />
          
          <TextArea 
            label=""
            value={formData.generalComments}
            onChange={(e) => handleInputChange('generalComments', e.target.value)}
            placeholder="Enter general comments here..."
            rows={6}
          />
        </div>

        {/* Signature Section */}
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput 
              label="Completed By"
              value={formData.completedBy}
              onChange={(e) => handleInputChange('completedBy', e.target.value)}
              className="text-lg py-3"
            />
            <FormInput 
              label="Sign"
              value={formData.signature}
              onChange={(e) => handleInputChange('signature', e.target.value)}
              className="text-lg py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillingInspectionForm;