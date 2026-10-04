// Círculos de muestra de un preset/skin. `overlap` los encima (lista de skins);
// sin overlap van separados (tarjetas de presets).
interface ColorDotsProps {
  colors: string[];
  size?: number;
  overlap?: boolean;
  ringClassName?: string;
}

export function ColorDots({ colors, size = 18, overlap = false, ringClassName = 'border-black/15' }: ColorDotsProps) {
  return (
    <span aria-hidden className={`flex ${overlap ? '' : 'gap-1.5'}`}>
      {colors.map((color, i) => (
        <span
          key={i}
          className={`rounded-full border ${ringClassName}`}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            marginLeft: overlap && i > 0 ? -size / 3 : 0,
          }}
        />
      ))}
    </span>
  );
}
