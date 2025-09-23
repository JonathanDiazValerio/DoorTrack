import MeasurementList from '../MeasurementList'

import { useState } from 'react'

export default function MeasurementListExample() {
  // todo: remove mock functionality
  const [measurements, setMeasurements] = useState([
    {
      id: '1',
      height: '84.50',
      width: '36.25',
      type: 'Door',
      createdAt: '2024-03-15T14:30:00Z',
    },
    {
      id: '2',
      height: '96.00',
      width: '48.75',
      type: 'Window',
      createdAt: '2024-03-15T15:45:00Z',
    },
    {
      id: '3',
      height: '80.25',
      width: '32.00',
      type: 'Fixed pane',
      createdAt: '2024-03-15T16:20:00Z',
    },
  ]);

  const handleDeleteMeasurement = (measurementId: string) => {
    setMeasurements(measurements.filter(m => m.id !== measurementId));
  };

  return (
    <MeasurementList
      measurements={measurements}
      clientName="Johnson Construction"
      onDeleteMeasurement={handleDeleteMeasurement}
    />
  )
}