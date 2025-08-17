import React from "react";
import { PokemonWithDamageRelations } from "../../lib/pokeapi";

interface DamageRelationsDisplayProps {
  damageRelations: PokemonWithDamageRelations["damageRelations"];
}

const TypeBadge = ({
  typeName,
  multiplier,
}: {
  typeName: string;
  multiplier?: number;
}) => (
  <div
    className="flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium capitalize text-white"
    style={{ backgroundColor: `var(--type-${typeName})` }}
  >
    {typeName}
    {multiplier && (
      <span className="ml-1.5 text-xs font-semibold">x{multiplier}</span>
    )}
  </div>
);

const DamageRelationsDisplay: React.FC<DamageRelationsDisplayProps> = ({
  damageRelations,
}) => {
  const { weaknesses, resistances, immunities } = damageRelations;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-center">Weaknesses</h3>
        {weaknesses.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {weaknesses.map(({ name, multiplier }) => (
              <TypeBadge key={name} typeName={name} multiplier={multiplier} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">None</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-center">Resistances</h3>
        {resistances.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {resistances.map(({ name, multiplier }) => (
              <TypeBadge key={name} typeName={name} multiplier={multiplier} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">None</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-center">Immunities</h3>
        {immunities.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {immunities.map((name) => (
              <TypeBadge key={name} typeName={name} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">None</p>
        )}
      </div>
    </div>
  );
};

export default DamageRelationsDisplay;
