import React, { useEffect, useState } from 'react';
import SurveyCleaningForm from './SurveyCleaningForm';
import BlindingForm from './BlindingForm';
import ReinforcementPlinthForm from './ReinforcementPlinthForm';
import FinalInspectionForm from './FinalInspectionForm';

const initialFormData = {
  padLocation: '',
  date: '',
  afcNo: '',
  padName: '',

  // each section holds items by key: { value: '', comments: '' } plus approval fields
  survey: {},
  blinding: {},
  reinforcement: {},
  plinth: {},
  final: {}
};

const PumpStationInspectionForm = ({onChange, data}) => {
  const [formData, setFormData] = useState(data||initialFormData);

  const [step, setStep] = useState(0);

  useEffect(()=>{
    onChange(formData)
  },[formData])

  // generic set for simple fields and nested dot paths (supports 'section.field' or 'padLocation')
  const handleInputChange = (path, value) => {
    // support dotted path
    if (typeof path === 'string' && path.includes('.')) {
      const [section, field] = path.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [path]: value
      }));
    }
  };

  // For audit items: section = 'survey' | 'blinding' | 'reinforcement' | 'plinth' | 'final'
  // itemKey = e.g. 'mixing_ratio', field = 'value' or 'comments'
  const handleAuditChange = (section, itemKey, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [itemKey]: {
          ...(prev[section]?.[itemKey] || {}),
          [field]: value
        }
      }
    }));
  };

  const steps = [
    { title: 'Survey & Cleaning', component: SurveyCleaningForm },
    { title: 'Blinding', component: BlindingForm },
    { title: 'Reinforcement & Plinth', component: ReinforcementPlinthForm },
    { title: 'Final Inspection', component: FinalInspectionForm }
  ];

  const CurrentStepComponent = steps[step].component;

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    // handle submission — replace with your API call or persistence
    console.log('Submitting Pump Station Inspection Form:', formData);
    // simple success feedback — adapt as needed
    alert('Form submitted — check console for payload.');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Step {step + 1} of {steps.length}: {steps[step].title}</div>
      </div>

      <CurrentStepComponent
        formData={formData}
        handleInputChange={handleInputChange}
        handleAuditChange={handleAuditChange}
      />

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={back}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          disabled={step === 0}
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setFormData(initialFormData); setStep(0); }}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PumpStationInspectionForm;
