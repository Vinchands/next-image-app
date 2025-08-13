type CanProps = {
  action: boolean
  children: () => React.ReactNode
  fallback: () => React.ReactNode
}

export default function Can({ action, children, fallback }: CanProps) {
  return action? children : fallback
}
