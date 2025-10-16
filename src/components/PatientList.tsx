import { Search } from "lucide-react";
import { Patient } from "@/data/mockData";

interface PatientListProps {
  patients: Patient[];
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PatientList = ({
  patients,
  selectedPatient,
  onSelectPatient,
  searchTerm,
  setSearchTerm,
}: PatientListProps) => {
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const icuPatients = filteredPatients.filter((p) => p.location === "ICU");
  const wardPatients = filteredPatients.filter((p) => p.location === "Wards");

  const getStatusColor = (patient: Patient) => {
    // Simple logic: if any vital is outside normal range, show warning/critical
    const { heartRate, spO2, temp } = patient.vitals;
    if (spO2 < 90 || temp > 38.5 || heartRate > 110) return "bg-destructive";
    if (spO2 < 95 || temp > 38 || heartRate > 100) return "bg-warning";
    return "bg-success";
  };

  const renderPatientItem = (patient: Patient) => (
    <button
      key={patient.id}
      onClick={() => onSelectPatient(patient)}
      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
        selectedPatient.id === patient.id
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(patient)}`}></div>
        <div className="flex-1">
          <div className="text-sm font-medium">{patient.name}</div>
          <div className="text-xs opacity-70">{patient.room}</div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="bg-card h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">PATIENT</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground">ICU</h3>
            <h3 className="text-xs font-semibold text-muted-foreground">WARDS</h3>
          </div>
          <div className="h-px bg-border mb-3"></div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">ICU</h3>
          <div className="space-y-1">
            {icuPatients.map(renderPatientItem)}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">WARDS</h3>
          <div className="space-y-1">
            {wardPatients.map(renderPatientItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
