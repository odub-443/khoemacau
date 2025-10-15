import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import DAHIForm from "./DAHI"
import { useEffect, useMemo, useState } from "react"
import DrillingInspectionForm from "./DDIPTO"
import StopLogInspectionForm from "./OIS"
import ActiveStopingInspectionForm from "./ASA"
import FibrecreteObservationForm from "./FPTO"
import ActiveHeadingProductionForm from "./AHIP"
import PTOStopeChargingForm from "./PTOSCF"
import ProductionDrillingForm from "./PD-PTO"
import PumpStationInspectionForm from "./PSC/PSC"
import RefugeChamberInspectionForm from "./RCIC"
import { useSearchParams } from "react-router"

// Dynamic Form Page Layout Component
export function DynamicFormPage({ 
  title, 
  description, 
  pageTitle, 
  breadcrumbs, 
  children,
}) {
  return (
    <div>
      <PageMeta title={title} description={description} />
      <PageBreadcrumb 
        pageTitle={pageTitle} 
        title={title}
        breadcrumbs={breadcrumbs}
      />
      <div>{children}</div>
    </div>
  );
}

export default function FormElements() {
const [searchParams] = useSearchParams();


  const formId = useMemo(() => window.location.pathname, [window.location.pathname]);

  // If docId param is passed, we are editing an existing document
  const documentId = useMemo(() => searchParams.get("docId"), [searchParams]);

  const [currentData, setCurrentFormData] = useState(null);

    // compute initial draft (or null) based on formId
  const initialDraft = useMemo(() => {
    const draftKey = `draft:${formId}`;
    const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
    if (documentId){
    const listKey = `list:${formId}`;
      const savedList = JSON.parse(localStorage.getItem(listKey) || "[]");
      return savedList.find(item=>item.id === documentId)
      //Find this document and make it thi initial draft
    } else if (draft) {
      console.log("Found draft");
      return draft;
    }

    return null;
  }, [formId, documentId]);

  // Save draft to localStorage whenever form data changes
  const onFormDataChanged = (data) => {
    console.log(formId,data)
    setCurrentFormData(data);
    const draftKey = `draft:${formId}`;
    localStorage.setItem(
      draftKey,
      JSON.stringify({
        ...data,
        documentId: documentId ?? null,
        updatedAt: new Date().toISOString(),
      })
    );
  };

  const onSaveForm = () => {
    const listKey = `list:${formId}`;
    const draftKey = `draft:${formId}`;

    const savedList = JSON.parse(localStorage.getItem(listKey) || "[]");

    if (documentId) {
      // Update existing form
      const updatedList = savedList.map((doc) =>
        doc.id === documentId
          ? { ...doc, ...currentData, updatedAt: new Date().toISOString() }
          : doc
      );
      localStorage.setItem(listKey, JSON.stringify(updatedList));
    } else {
      // Create new form document
      const newDoc = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...currentData,
      };
      savedList.push(newDoc);
      localStorage.setItem(listKey, JSON.stringify(savedList));
    }

    // Clear draft after saving
    localStorage.removeItem(draftKey);
    // alert("Form saved successfully!");
    window.location.href = formId.replace('form','table')
  };

  const formsMap = useMemo(() => {
    return {
      "/form-dahi": { form: <DAHIForm  data={initialDraft}  onChange={onFormDataChanged} />, page: 'Development AHI', title: "AFC & Active Heading Inspection Sheet" },
      "/form-asa": { form: <ActiveStopingInspectionForm data={initialDraft} onChange={onFormDataChanged} />, page: "Active Stope Audit", title: "Active Stope Audit" },
      "/form-dipto": { form: <DrillingInspectionForm  data={initialDraft}  onChange={onFormDataChanged} />, page: "DDIPTO", title: "Development Drilling Inspection - PTO" },
      "/form-oi": { form: <StopLogInspectionForm  data={initialDraft}  onChange={onFormDataChanged} />, page: "Orepass Inspection", title: "Stop Log/Tipping Inspection Validation Checklist" },
      "/form-fpto": { form: <FibrecreteObservationForm  data={initialDraft}  onChange={onFormDataChanged} />, page: "Fibrecrete PTO", title: "Planned Task Observation – Fibrecrete" },
      "/form-pahi": { form: <ActiveHeadingProductionForm  data={initialDraft}  onChange={onFormDataChanged} />, page: "AHI S - Production", title: "Active Heading Inspection Sheet-Production" },
      "/form-scipto": { form: <PTOStopeChargingForm  data={initialDraft}  onChange={onFormDataChanged} />, page: "Stope Charging Ins. PTO", title: "PTO-Stope Charging Inspection" },
      "/form-pdpto": { form: <ProductionDrillingForm   data={initialDraft}  onChange={onFormDataChanged} />, page: "Production Drilling PTO", title: "Production Drilling PTO" },
      "/form-pcpc": { form: <PumpStationInspectionForm data={initialDraft}  onChange={onFormDataChanged} />, page: "Pumpstation CPC", title: "Pumpstation Concrete Pad Construction" },
      "/form-rci": { form: <RefugeChamberInspectionForm data={initialDraft}  onChange={onFormDataChanged} />, page: "Refuge Chamber Ins.", title: "Refuge Chamber Inspection Checklist" },
    }[formId];
  }, [formId]);

  if (!formsMap) {
    return <p>No form found for this route</p>;
  }

  return (
    <>
      <DynamicFormPage
        title={formsMap.page}
        description="Offline-capable inspection forms"
        pageTitle={formsMap.title}
      >
        {formsMap.form}
      </DynamicFormPage>
<div className="flex flex-row justify-end">
        <button onClick={onSaveForm} className="bg-blue-500 text-white px-4 my-4 py-2 rounded">
        Save Form
      </button>
      </div>
    </>
  );
}
