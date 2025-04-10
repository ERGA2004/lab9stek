import '../styles/auth.css'; // Обновляем путь к стилям

export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      {children}
    </div>
  );
}
