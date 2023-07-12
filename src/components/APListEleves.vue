<template>
  <div>
    <q-table
      flat
      title="Élèves"
      :rows="rows"
      :columns="columns"
      row-key="nom"
      card-class="bg-galette"
    />
  </div>
</template>

<script>
const columns = [
  { name: 'nom', required: true, label: 'Nom', align: 'center', field: row => row.nom, sortable: true },
  { name: 'Prenom', align: 'center', label: 'Prenom', field: row => row.prenom, sortable: true },
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