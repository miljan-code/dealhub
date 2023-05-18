import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {}

export const EmptyState = ({ className, ...props }: EmptyStateProps) => {
  return (
    <Card
      className={cn(
        'flex h-96 flex-col items-center justify-center',
        className
      )}
      {...props}
    />
  );
};

interface EmptyStateHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyState.Heading = function EmptyStateHeading({
  className,
  ...props
}: EmptyStateHeadingProps) {
  return <h3 className={cn('font-semibold', className)} {...props} />;
};

interface EmptyStateTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyState.Text = function EmptyStateText({
  className,
  ...props
}: EmptyStateTextProps) {
  return (
    <p className={cn('text-sm text-foreground/50', className)} {...props} />
  );
};
