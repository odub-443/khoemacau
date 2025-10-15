import { useMemo } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.js";
import ComponentCard from "../../components/common/ComponentCard.js";
import PageMeta from "../../components/common/PageMeta.js";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne.js";

export default function DynamicFormTable() {

  const formId = useMemo(() => window.location.pathname.replace('table','form'), [window.location.pathname]);

  const formConfig = useMemo(() => {
    return {
      "/form-dahi": { page: "Development AHI", title: "AFC & Active Heading Inspection Sheet" },
      "/form-asa": { page: "Active Stope Audit", title: "Active Stope Audit" },
      "/form-dipto": { page: "DDIPTO", title: "Development Drilling Inspection - PTO" },
      "/form-oi": { page: "Orepass Inspection", title: "Stop Log/Tipping Inspection Validation Checklist" },
      "/form-fpto": { page: "Fibrecrete PTO", title: "Planned Task Observation – Fibrecrete" },
      "/form-pahi": { page: "AHI S - Production", title: "Active Heading Inspection Sheet-Production" },
      "/form-scipto": { page: "Stope Charging Ins. PTO", title: "PTO-Stope Charging Inspection" },
      "/form-pdpto": { page: "Production Drilling PTO", title: "Production Drilling PTO" },
      "/form-pcpc": { page: "Pumpstation CPC", title: "Pumpstation Concrete Pad Construction" },
      "/form-rci": { page: "Refuge Chamber Ins.", title: "Refuge Chamber Inspection Checklist" },
    }[formId];
  }, [formId]);

  if (!formConfig) {
    return <p className="text-red-500">Invalid form selected.</p>;
  }

  return (
    <>
      <PageMeta
        title={`${formConfig.title} | TailAdmin - Next.js Admin Dashboard Template`}
        description={`This is the ${formConfig.title} table page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template`}
      />
      <PageBreadcrumb pageTitle={formConfig.title}>
        
      </PageBreadcrumb>
      <div className="space-y-6">
        <ComponentCard title={formConfig.title} buttonPath={formId}>
          <BasicTableOne formId={formId} />
        </ComponentCard>
      </div>
    </>
  );
}
