import MeasurementList from '../MeasurementList'

export default function MeasurementListExample() {
  // todo: remove mock functionality
  const mockMeasurements = [
    {
      id: '1',
      height: '84.50',
      width: '36.25',
      createdAt: '2024-03-15T14:30:00Z',
    },
    {
      id: '2',
      height: '96.00',
      width: '48.75',
      createdAt: '2024-03-15T15:45:00Z',
    },
    {
      id: '3',
      height: '80.25',
      width: '32.00',
      createdAt: '2024-03-15T16:20:00Z',
    },
  ];

  return (
    <MeasurementList
      measurements={mockMeasurements}
      clientName="Johnson Construction"
    />
  )
}