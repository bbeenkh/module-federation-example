import Providers from '@/components/layouts/Providers';
import '../main.css';

export default function TestRoot() {
  return (
    <Providers>
      <div style={{ padding: '20px' }}>
        <h2>Module Federation Remote Module</h2>
        <p>이 컴포넌트는 remote module로 호스트 앱에서 로드됩니다.</p>
        <p>Module Federation 연동 테스트용 컴포넌트입니다.</p>
      </div>
    </Providers>
  );
}
