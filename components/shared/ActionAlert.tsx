import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

type ActionAlertProps = {
  title: string
  description?: string
  renderTrigger: React.ReactNode
  renderAction: React.ReactNode
}

export default function ActionAlert({
  title,
  description,
  renderTrigger,
  renderAction
}: ActionAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{renderTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {renderAction}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
