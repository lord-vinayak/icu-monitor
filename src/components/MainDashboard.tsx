import { Patient, VITAL_RANGES } from "@/data/mockData";
import VitalCard from "./VitalCard";
import TrendsChart from "./TrendsChart";
import { User } from "lucide-react";

interface MainDashboardProps {
  patient: Patient;
}

const MainDashboard = ({ patient }: MainDashboardProps) => {
  const getVitalStatus = (value: number, vitalType: keyof typeof VITAL_RANGES): "normal" | "warning" | "critical" => {
    const range = VITAL_RANGES[vitalType];
    if (value >= range.normal[0] && value <= range.normal[1]) return "normal";
    if (value >= range.warning[0] && value <= range.warning[1]) return "warning";
    return "critical";
  };

  const getBPStatus = (): "normal" | "warning" | "critical" => {
    const { systolic, diastolic } = patient.vitals.bp;
    const sysStatus = getVitalStatus(systolic, "systolic");
    const diaStatus = getVitalStatus(diastolic, "diastolic");
    
    if (sysStatus === "critical" || diaStatus === "critical") return "critical";
    if (sysStatus === "warning" || diaStatus === "warning") return "warning";
    return "normal";
  };

  // Prepare data for trends chart
  const combinedTrendsData = patient.trends.heartRate.map((_, index) => ({
    name: `${index * 4}`,
    bp_sys: patient.trends.bp[index]?.systolic || 0,
    bp_dia: patient.trends.bp[index]?.diastolic || 0,
    spO2: patient.trends.spO2[index]?.value || 0,
    temp: patient.trends.temp[index]?.value || 0,
  }));

  const secondaryTrendsData = patient.trends.heartRate.map((_, index) => ({
    name: `${index * 4}`,
    heartRate: patient.trends.heartRate[index]?.value || 0,
    respirate: patient.trends.respirate[index]?.value || 0,
    etco2: patient.trends.etco2[index]?.value || 0,
  }));

  return (
    <div className="bg-card h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">
                Age: {patient.age} • {patient.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">REAL-TIME VITALS & TRENDS</h3>
        
        {/* Vitals Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <VitalCard
            label="PULSE"
            value={patient.vitals.heartRate}
            unit="BPM"
            status={getVitalStatus(patient.vitals.heartRate, "heartRate")}
            sparklineData={patient.trends.heartRate.slice(-10).map(d => d.value)}
            min={40}
            max={140}
          />
          <VitalCard
            label="BP"
            value={`${patient.vitals.bp.systolic}/${patient.vitals.bp.diastolic}`}
            unit="mmHg"
            status={getBPStatus()}
            sparklineData={patient.trends.bp.slice(-10).map(d => d.systolic)}
            min={60}
            max={180}
          />
          <VitalCard
            label="TEMP"
            value={patient.vitals.temp.toFixed(1)}
            unit="°C"
            status={getVitalStatus(patient.vitals.temp, "temp")}
            sparklineData={patient.trends.temp.slice(-10).map(d => d.value)}
            min={35}
            max={40}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <VitalCard
            label="RESPIRATION"
            value={patient.vitals.respirate}
            unit="nrHg"
            status={getVitalStatus(patient.vitals.respirate, "respirate")}
            sparklineData={patient.trends.respirate.slice(-10).map(d => d.value)}
            min={8}
            max={30}
          />
          <VitalCard
            label="SpO₂"
            value={`${patient.vitals.spO2}%`}
            unit="%"
            status={getVitalStatus(patient.vitals.spO2, "spO2")}
            sparklineData={patient.trends.spO2.slice(-10).map(d => d.value)}
            min={80}
            max={100}
          />
          <VitalCard
            label="ETCO₂"
            value={patient.vitals.etco2}
            unit="mmHg"
            status={getVitalStatus(patient.vitals.etco2, "etco2")}
            sparklineData={patient.trends.etco2.slice(-10).map(d => d.value)}
            min={25}
            max={55}
          />
        </div>

        {/* Trends Charts */}
        <TrendsChart
          title="TRENDS (LAST 12 HRS)"
          data={combinedTrendsData}
          lines={[
            { dataKey: "bp_sys", color: "hsl(var(--chart-1))", name: "BP - Systolic" },
            { dataKey: "bp_dia", color: "hsl(var(--chart-1))", name: "BP - Diastolic" },
            { dataKey: "spO2", color: "hsl(var(--chart-2))", name: "SPo₂" },
            { dataKey: "temp", color: "hsl(var(--chart-3))", name: "Temp" },
          ]}
        />

        <div className="mt-4">
          <TrendsChart
            title="TRENDS (LAST 12 HRS)"
            data={secondaryTrendsData}
            lines={[
              { dataKey: "heartRate", color: "hsl(var(--chart-1))", name: "Heart Rate" },
              { dataKey: "respirate", color: "hsl(var(--chart-3))", name: "Respirate" },
              { dataKey: "etco2", color: "hsl(var(--chart-2))", name: "ETCO₂" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
