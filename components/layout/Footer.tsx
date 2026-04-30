export function Footer() {
  return (
    <footer className="hairline-t mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <p className="label-spec">VIA·HABITA</p>
            <p className="text-sm text-steel-300 leading-relaxed">
              Plataforma CDE de Grupo Inmobiliario Habita.
              <br />
              Codesarrollada con INFRATEK LLC.
            </p>
          </div>

          <div className="space-y-3">
            <p className="label-spec">Contacto</p>
            <ul className="space-y-1.5 text-sm text-steel-300">
              <li>
                <a
                  href="mailto:sergio@infratek.ai"
                  className="hover:text-[var(--color-copper)] transition-colors"
                >
                  sergio@infratek.ai
                </a>
              </li>
              <li>
                <a
                  href="mailto:p.otero@ihabita.cl"
                  className="hover:text-[var(--color-copper)] transition-colors"
                >
                  p.otero@ihabita.cl
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-spec">Documento</p>
            <ul className="space-y-1.5 text-sm text-steel-300 font-spec">
              <li>INFRATEK·HABITA·PROP·2026·FINAL</li>
              <li>v11.0 Final Integrada</li>
              <li>Válido hasta 31 May 2026</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-spec">Estado</p>
            <ul className="space-y-1.5 text-sm text-steel-300 font-spec">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--color-electric)] animate-pulse" />
                <span>Documento confidencial</span>
              </li>
              <li>Propiedad de INFRATEK LLC</li>
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-steel-400 font-spec">
          <span>© 2026 INFRATEK LLC · Puerto Rico</span>
          <span>Todos los montos en USD · Precios sin IVA</span>
        </div>
      </div>
    </footer>
  );
}
