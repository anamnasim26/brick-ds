import { Alert } from '@/components/Alert';

export default function App() {
  return (
    <div className="min-h-screen bg-brick-grey-200 flex flex-col items-center gap-16 p-32">
      <Alert variant="general" />
      <Alert variant="success" />
      <Alert variant="warning" />
      <Alert variant="failure" />
      <Alert variant="info" />
      <Alert variant="general" showActions={false} showCloseIcon={false} />
      <Alert variant="success" showSupportingText={false} />
    </div>
  );
}
