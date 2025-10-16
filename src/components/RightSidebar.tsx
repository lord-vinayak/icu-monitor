import { useState } from "react";
import { Patient } from "@/data/mockData";

export interface Alarm {
  id: string;
  patientId: number;
  patientName: string;
  type: "CRITICAL" | "WARNING";
  message: string;
  timestamp: Date;
  room: string;
}

interface RightSidebarProps {
  alarms: Alarm[];
  onAcknowledgeAlarm: (alarmId: string) => void;
  patient: Patient;
}

const RightSidebar = ({ alarms, onAcknowledgeAlarm, patient }: RightSidebarProps) => {
  const [alarmsTab, setAlarmsTab] = useState<"AI" | "LOCAL">("AI");
  const [historyTab, setHistoryTab] = useState<"MEDICAL" | "PHYSICIAN">("MEDICAL");

  return (
    <div className="bg-card h-full overflow-hidden flex flex-col">
      {/* Alarms Section */}
      <div className="flex-1 flex flex-col border-b border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-3">ALARMS & ALERTS</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setAlarmsTab("AI")}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                alarmsTab === "AI"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              AI ALARMS
            </button>
            <button
              onClick={() => setAlarmsTab("LOCAL")}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                alarmsTab === "LOCAL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              LOCAL ALARMS
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {alarms.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-8">
              No active alarms
            </div>
          ) : (
            alarms.map((alarm) => (
              <div
                key={alarm.id}
                className="bg-secondary border border-border rounded-lg p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      alarm.type === "CRITICAL"
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-warning text-warning-foreground"
                    }`}
                  >
                    {alarm.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {alarm.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm font-medium">{alarm.message}</p>
                <div className="text-xs text-muted-foreground">
                  {alarm.patientName} • {alarm.room}
                </div>
                <button
                  onClick={() => onAcknowledgeAlarm(alarm.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  ACKNOWLEDGE
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* History Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-3">HISTORY & NOTES</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setHistoryTab("MEDICAL")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                historyTab === "MEDICAL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              MEDICAL HISTORY
            </button>
            <button
              onClick={() => setHistoryTab("PHYSICIAN")}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                historyTab === "PHYSICIAN"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              PHYSICIAN'S ORDERS
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {historyTab === "MEDICAL" ? patient.history.medical : patient.history.physician}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
