import { useState, useEffect } from "react";
import { initialPatients, Patient, VITAL_RANGES } from "@/data/mockData";
import Header from "@/components/Header";
import PatientList from "@/components/PatientList";
import MainDashboard from "@/components/MainDashboard";
import RightSidebar, { Alarm } from "@/components/RightSidebar";

const Index = () => {
  const [patientsData, setPatientsData] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient>(
    initialPatients.find((p) => p.location === "ICU") || initialPatients[0]
  );
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update selected patient when patients data changes
  useEffect(() => {
    const updatedPatient = patientsData.find((p) => p.id === selectedPatient.id);
    if (updatedPatient) {
      setSelectedPatient(updatedPatient);
    }
  }, [patientsData, selectedPatient.id]);

  // Simulation logic - update vitals every 3 seconds
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      setPatientsData((prevPatients) =>
        prevPatients.map((patient) => {
          // Randomly fluctuate vitals
          const fluctuation = Math.random() > 0.7; // 30% chance of significant change
          const variance = fluctuation ? 5 : 2;

          const newVitals = {
            heartRate: Math.max(
              40,
              Math.min(
                150,
                patient.vitals.heartRate + (Math.random() - 0.5) * variance
              )
            ),
            bp: {
              systolic: Math.max(
                70,
                Math.min(
                  180,
                  patient.vitals.bp.systolic + (Math.random() - 0.5) * variance
                )
              ),
              diastolic: Math.max(
                40,
                Math.min(
                  110,
                  patient.vitals.bp.diastolic + (Math.random() - 0.5) * (variance * 0.8)
                )
              ),
            },
            temp: Math.max(
              35,
              Math.min(
                40,
                patient.vitals.temp + (Math.random() - 0.5) * 0.3
              )
            ),
            respirate: Math.max(
              8,
              Math.min(
                35,
                patient.vitals.respirate + (Math.random() - 0.5) * 2
              )
            ),
            spO2: Math.max(
              85,
              Math.min(
                100,
                patient.vitals.spO2 + (Math.random() - 0.5) * 3
              )
            ),
            etco2: Math.max(
              25,
              Math.min(
                55,
                patient.vitals.etco2 + (Math.random() - 0.5) * 2
              )
            ),
          };

          // Check for alarm conditions
          const checkAlarm = (
            value: number,
            vitalType: keyof typeof VITAL_RANGES,
            label: string
          ) => {
            const range = VITAL_RANGES[vitalType];
            const existingAlarm = alarms.find(
              (a) =>
                a.patientId === patient.id &&
                a.message.includes(label)
            );

            if (value < range.warning[0] || value > range.warning[1]) {
              if (!existingAlarm) {
                const isCritical =
                  value < range.critical[0] || value > range.critical[1];
                const newAlarm: Alarm = {
                  id: `${patient.id}-${label}-${Date.now()}`,
                  patientId: patient.id,
                  patientName: patient.name,
                  type: isCritical ? "CRITICAL" : "WARNING",
                  message: `${label} ${
                    isCritical ? "CRITICAL" : "Trend"
                  } - ${label}: ${Math.round(value)}`,
                  timestamp: new Date(),
                  room: patient.room,
                };
                setAlarms((prev) => [...prev, newAlarm]);
              }
            }
          };

          // Check all vitals for alarms
          checkAlarm(newVitals.heartRate, "heartRate", "Heart Rate");
          checkAlarm(newVitals.bp.systolic, "systolic", "BP Systolic");
          checkAlarm(newVitals.bp.diastolic, "diastolic", "BP Diastolic");
          checkAlarm(newVitals.temp, "temp", "Temperature");
          checkAlarm(newVitals.respirate, "respirate", "Respiration Rate");
          checkAlarm(newVitals.spO2, "spO2", "SpO₂");
          checkAlarm(newVitals.etco2, "etco2", "ETCO₂");

          // Update trends
          const newTrends = {
            heartRate: [
              ...patient.trends.heartRate.slice(-29),
              { name: `${patient.trends.heartRate.length}`, value: Number(newVitals.heartRate.toFixed(0)) },
            ],
            bp: [
              ...patient.trends.bp.slice(-29),
              {
                name: `${patient.trends.bp.length}`,
                systolic: Number(newVitals.bp.systolic.toFixed(0)),
                diastolic: Number(newVitals.bp.diastolic.toFixed(0)),
              },
            ],
            temp: [
              ...patient.trends.temp.slice(-29),
              { name: `${patient.trends.temp.length}`, value: Number(newVitals.temp.toFixed(1)) },
            ],
            spO2: [
              ...patient.trends.spO2.slice(-29),
              { name: `${patient.trends.spO2.length}`, value: Number(newVitals.spO2.toFixed(0)) },
            ],
            respirate: [
              ...patient.trends.respirate.slice(-29),
              { name: `${patient.trends.respirate.length}`, value: Number(newVitals.respirate.toFixed(0)) },
            ],
            etco2: [
              ...patient.trends.etco2.slice(-29),
              { name: `${patient.trends.etco2.length}`, value: Number(newVitals.etco2.toFixed(0)) },
            ],
          };

          return {
            ...patient,
            vitals: {
              heartRate: Number(newVitals.heartRate.toFixed(0)),
              bp: {
                systolic: Number(newVitals.bp.systolic.toFixed(0)),
                diastolic: Number(newVitals.bp.diastolic.toFixed(0)),
              },
              temp: Number(newVitals.temp.toFixed(1)),
              respirate: Number(newVitals.respirate.toFixed(0)),
              spO2: Number(newVitals.spO2.toFixed(0)),
              etco2: Number(newVitals.etco2.toFixed(0)),
            },
            trends: newTrends,
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(simulationInterval);
  }, [alarms]);

  const handleAcknowledgeAlarm = (alarmId: string) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== alarmId));
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Header alarmCount={alarms.length} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Patient List */}
        <div className="w-64 border-r border-border">
          <PatientList
            patients={patientsData}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 overflow-hidden">
          <MainDashboard patient={selectedPatient} />
        </div>

        {/* Right Sidebar - Alarms & History */}
        <div className="w-80 border-l border-border">
          <RightSidebar
            alarms={alarms}
            onAcknowledgeAlarm={handleAcknowledgeAlarm}
            patient={selectedPatient}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
