<template>
  <div>
    <q-table
    flat
      title="Absence"
      :rows="rows"
      :columns="columns"
      row-key="nom"
      card-class="bg-galette"
    />
  </div>
</template>

<script>
const columns = [
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'center',
    field: row => row.nom,
    sortable: true
  },
  { name: 'Prenom', align: 'center', label: 'Prenom', field: row => row.prenom, sortable: true },
  { name: 'date', align: 'center', label: 'Date',field: row => row.date, sortable: true },
  { name: 'cours', align: 'center', label: 'Cours',field: row => row.cours, sortable: true},
  { name: 'intervenant', align: 'center', label: 'Intervenant',field: row => row.intervenant, sortable: true },
  { name: 'justificatif', align: 'center', label: 'Justificatif', field: row => row.justificatif, sortable: true },
]

const rows = [
  {
    nom: 'DUVAL',
    prenom: 'Vincent',
    date: '04//07/2023',
    cours: 'UML',
    intervenant: 'BONCHE',
    justificatif: null,
  },
  {
    nom: 'JEAN',
    prenom: 'Anthony',
    date: '04//07/2023',
    cours: 'Assembleur',
    intervenant: 'BOUMGHAR',
    justificatif: null,
  },
  {
    nom: 'PEYRARD',
    prenom: 'Tibaut',
    date: '04//07/2023',
    cours: 'java',
    intervenant: 'JESEPLUS',
    justificatif: null,
  },
  {
    nom: 'DI-RIENZO',
    prenom: 'Matteo',
    date: '04//07/2023',
    cours: 'Droit',
    intervenant: 'CLOPPET',
    justificatif: null,
  },
  {
    nom: 'HERNANDEZ',
    prenom: 'Mathis',
    date: '04//07/2023',
    cours: 'Application Androîd',
    intervenant: 'VARDAGNANT',
    justificatif: null,
  },
]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>