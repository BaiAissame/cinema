export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const moisNom = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const jour = date.getDate();
    const mois = moisNom[date.getMonth()];
    const annee = date.getFullYear();
    return `${jour} ${mois} ${annee}`;
  };
  