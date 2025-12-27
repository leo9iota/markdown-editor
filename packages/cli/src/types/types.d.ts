declare module 'tiged' {
    interface TigedOptions {
        disableCache?: boolean;
        force?: boolean;
        verbose?: boolean;
        mode?: 'tar' | 'git';
    }

    interface TigedEmitter {
        on(event: 'info' | 'warn' | 'cache' | 'download', callback: (info: any) => void): this;
        clone(dest: string): Promise<void>;
    }

    export default function tiged(src: string, opts?: TigedOptions): TigedEmitter;
}
