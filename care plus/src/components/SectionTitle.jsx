export default function SectionTitle({ children }) {
  return (
    <p style={{ padding: '0 16px', marginBottom: 12, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7E91' }}>
      {children}
    </p>
  )
}