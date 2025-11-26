import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { useToast, type ToastType } from '../../contexts/ToastContext';
import { cn } from '../../utils/cn';

const toastConfig = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        textColor: 'text-green-800',
        iconColor: 'text-green-500',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500',
        textColor: 'text-red-800',
        iconColor: 'text-red-500',
    },
    warning: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-500',
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-500',
    },
};

export const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
            {toasts.map((toast) => {
                const config = toastConfig[toast.type as ToastType];
                const Icon = config.icon;

                return (
                    <div
                        key={toast.id}
                        className={cn(
                            'flex items-center gap-3 rounded-lg border-l-4 p-4 shadow-lg animate-slide-in-right',
                            config.bgColor,
                            config.borderColor
                        )}
                    >
                        <Icon className={cn('h-5 w-5 flex-shrink-0', config.iconColor)} />
                        <p className={cn('text-sm font-medium', config.textColor)}>{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className={cn('ml-auto flex-shrink-0 rounded-lg p-1 hover:bg-black/5', config.textColor)}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
