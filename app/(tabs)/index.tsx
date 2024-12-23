import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import debounce from 'lodash.debounce';
import { useRouter } from 'expo-router';

const CHECKLIST_DATA = {
  title: 'Mapa de Carga Checklist Ambulância',
  vehicle: 'ABSC02',
  description: '',
  statusType: [
    {
      name: 'IDLE',
      description: 'Iniciado',
    },
    {
      name: 'PENDING',
      description: 'Em aberto',
    },
    {
      name: 'CLOSED',
      description: 'Fechado',
    },
    {
      name: 'CLOSED_MODIFIED',
      description: 'Fechado - Alterado',
    },
  ],
  units: [
    {
      name: 'UNITY',
      description: 'Unidade',
    },
    {
      name: 'BOX',
      description: 'Caixa',
    },
    {
      name: 'MULTI',
      description: 'Vários - sem valor pré-definido',
    },
    {
      name: 'EVEN',
      description: 'Par',
    },
  ],
  sections: [
    {
      name: 'Cabina de Condução',
      category: 'FLAT',
      items: [
        {
          name: 'Extintor',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Luvas Trabalho',
          defaultValue: 1,
          unit: 'EVEN',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Coletes Refletores',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Lanterna Portátil',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Intercomunicador',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Rádio Telecomunicações',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Triângulo',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Luvas L/M/S',
          defaultValue: 1,
          unit: 'BOX',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Iluminação Mapa Operacionais',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Óculos Trabalho',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Sistema Gestão Operações',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Capacetes',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
      ],
    },
    {
      name: 'Célula Sanitária',
      category: 'FLAT',
      items: [
        {
          name: 'Sonda Aspiração CH 18, 16, 14, 12, 10, 08, 06',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Saco Via Áerea',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Saco Trauma',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Garrafa O2 Portátil Operacional',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 2,
        },
        {
          name: 'Garrafa O2 Fixa Operacional',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 2,
        },
        {
          name: 'Conjunto Talas(120cm/90cm/50cm)',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 2,
        },
        {
          name: 'Aspirador (1 Cânula Rígida, 1 Tubo aspirador, 1 Saco aspirador)',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Contentor Cortantes',
          defaultValue: 2,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Papel de mãos',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
        {
          name: 'Desinfetante de Mãos',
          defaultValue: 1,
          unit: 'UNITY',
          checked: false,
          finalValue: 1,
        },
      ],
    },
    {
      name: 'Armário Lateral Esquerdo',
      category: 'SUBSECTIONS',
      items: [
        {
          name: 'Compartimento 1',
          items: [
            {
              name: 'Máscara Insuflador N 3/4/5',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Máscara O2 Adulto Simples',
              defaultValue: 4,
              unit: 'UNITY',
              checked: false,
              finalValue: 4,
            },
            {
              name: 'Máscara O2 Adulto Alta concentração',
              defaultValue: 3,
              unit: 'UNITY',
              checked: false,
              finalValue: 3,
            },
            {
              name: 'Cânula Nasal Adulto',
              defaultValue: 4,
              unit: 'UNITY',
              checked: false,
              finalValue: 4,
            },
          ],
        },
        {
          name: 'Compartimento 2',
          items: [
            {
              name: 'Lençol de Proteção',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Eletrodos/ Cabos ECG',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Termómetro Monitor',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Manga de Pressao Arterial Pediatrico / Oximetro Pediatrico',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Pocket Mask',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
          ],
        },
      ],
    },
    {
      name: 'Saco 1º Abordagem',
      category: 'SUBSECTIONS',
      items: [
        {
          name: 'Compartimento Central',
          items: [
            {
              name: 'Máquina Glicemia Capilar',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Lancetas',
              defaultValue: 10,
              unit: 'UNITY',
              checked: false,
              finalValue: 10,
            },
            {
              name: 'Tiras Glicemia Capilar',
              defaultValue: 1,
              unit: 'MULTI',
              checked: false,
              finalValue: 1,
            },
          ],
        },
        {
          name: 'Bolsa Esquerda Interna',
          items: [
            {
              name: 'Insuflador manual pediátrico',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Tubo conexão insuflador o2',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Filtro insuflador manual',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
          ],
        },
        {
          name: 'Bolsa Esquerda Externa',
          items: [
            {
              name: 'Esfigmomanômetro peditrico',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
            {
              name: 'Máscara o2 pediátrica simples',
              defaultValue: 10,
              unit: 'UNITY',
              checked: false,
              finalValue: 10,
            },
            {
              name: 'Máscara o2 pediátrica alta concentracao',
              defaultValue: 1,
              unit: 'UNITY',
              checked: false,
              finalValue: 1,
            },
          ],
        },
      ],
    },
  ],
  operationalNotes: '',
  createdAt: '',
  updatedAt: '',
  status: 'IDLE',
};
const HomeScreen = () => {
  const [checklist, setChecklist] = useState(CHECKLIST_DATA);
  const [notes, setNotes] = useState(CHECKLIST_DATA.operationalNotes || '');

  const router = useRouter();

  const updateServer = debounce((data) => {
    // Substitua esta linha pela lógica de envio para o servidor
    console.log('Enviando para o servidor:', data);
  }, 10000);

  const handleCheckItem = (sectionIndex, itemIndex, subsectionIndex) => {
    const updatedChecklist = { ...checklist };
    if (subsectionIndex !== undefined) {
      updatedChecklist.sections[sectionIndex].items[subsectionIndex].items[itemIndex].checked =
        !updatedChecklist.sections[sectionIndex].items[subsectionIndex].items[itemIndex].checked;
    } else {
      updatedChecklist.sections[sectionIndex].items[itemIndex].checked =
        !updatedChecklist.sections[sectionIndex].items[itemIndex].checked;
    }
    setChecklist(updatedChecklist);
    updateServer(updatedChecklist);
  };

  const handleChangeValue = (sectionIndex, itemIndex, value, subsectionIndex) => {
    const updatedChecklist = { ...checklist };
    const parsedValue = parseInt(value, 10) || 0;
    if (subsectionIndex !== undefined) {
      updatedChecklist.sections[sectionIndex].items[subsectionIndex].items[itemIndex].finalValue = parsedValue;
    } else {
      updatedChecklist.sections[sectionIndex].items[itemIndex].finalValue = parsedValue;
    }
    setChecklist(updatedChecklist);
    updateServer(updatedChecklist);
  };

  const renderItems = (items, sectionIndex, subsectionIndex) => {
    return items.map((item, itemIndex) => (
      <View key={itemIndex} style={styles.itemContainer}>
        <View style={styles.itemSubContainerLeft}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemDescription}>
            ({checklist.units.find((unit) => unit.name === item.unit).description})
          </Text>
        </View>
        <View style={styles.itemSubContainerRight}>
          <View style={[styles.itemControls, { opacity: item.checked ? 0.4 : 0.9 }]}>
            <TouchableOpacity
              onPress={() => handleChangeValue(sectionIndex, itemIndex, item.finalValue - 1, subsectionIndex)}
              style={styles.button}
              disabled={item.checked}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              value={String(item.finalValue)}
              onChangeText={(value) => handleChangeValue(sectionIndex, itemIndex, value, subsectionIndex)}
            />
            <TouchableOpacity
              onPress={() => handleChangeValue(sectionIndex, itemIndex, item.finalValue + 1, subsectionIndex)}
              style={styles.button}
              disabled={item.checked}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleCheckItem(sectionIndex, itemIndex, subsectionIndex)}
            style={styles.checkbox}
          >
            <Text style={{ fontSize: 35 }}>{item.checked ? '☑' : '☐'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  const renderSections = () => {
    return checklist.sections.map((section, sectionIndex) => (
      <View key={sectionIndex} style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.name}</Text>
        {section.category === 'FLAT'
          ? renderItems(section.items, sectionIndex)
          : section.items.map((subsection, subsectionIndex) => (
              <View key={subsectionIndex} style={styles.subsectionContainer}>
                <Text style={styles.subsectionTitle}>{subsection.name}</Text>
                {renderItems(subsection.items, sectionIndex, subsectionIndex)}
              </View>
            ))}
      </View>
    ));
  };

  const handleSubmit = () => {
    const updatedChecklist = { ...checklist, status: 'PENDING' };
    updateServer(updatedChecklist);
    router.setParams({ checklist: JSON.stringify(updatedChecklist) });
    router.push({ pathname: '/ChecklistSummary', params: { checklist: JSON.stringify(updatedChecklist) } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{checklist.title}</Text>
      {renderSections()}
      <Text style={styles.notesLabel}>Observações:</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        numberOfLines={5}
        value={notes}
        onChangeText={(text) => {
          setNotes(text);
          const updatedChecklist = { ...checklist, operationalNotes: text };
          setChecklist(updatedChecklist);
          updateServer(updatedChecklist);
        }}
      />
      <Button title='Enviar Checklist' onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 100, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionContainer: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subsectionContainer: { paddingLeft: 16 },
  subsectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  itemContainer: { flexDirection: 'row', flex: 1, width: '100%', alignItems: 'center', marginBottom: 8 },
  itemSubContainerLeft: { flex: 1 },
  itemSubContainerRight: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  itemTitle: { fontSize: 16, flex: 1 },
  itemDescription: { fontSize: 12, fontStyle: 'italic', color: '#666' },
  itemControls: { flexDirection: 'row', alignItems: 'center' },
  button: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  input: {
    width: 40,
    height: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 8,
  },
  checkbox: { marginLeft: 16 },
  notesLabel: { fontSize: 16, marginTop: 16 },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default HomeScreen;
