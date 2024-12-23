import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

const ChecklistSummary = () => {
  const local = useGlobalSearchParams();

  const [checklist, setChecklist] = useState(JSON.parse(local.checklist));

  // useEffect(() => {
  //   setChecklist(local.checklist);
  //   console.log(JSON.parse(checklist));
  // }, [local.checklist]);

  const renderItems = (items) =>
    items.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemDescription}>{`Default: ${item.defaultValue}, Atual: ${item.finalValue}`}</Text>
        <Text style={styles.itemDescription}>{item.checked ? '✔ Checado' : '✘ Não checado'}</Text>
      </View>
    ));

  const renderSections = () =>
    checklist?.sections.map((section, sectionIndex) => (
      <View key={sectionIndex} style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.name}</Text>
        {section.category === 'FLAT'
          ? renderItems(section.items)
          : section.items.map((subsection, subsectionIndex) => (
              <View key={subsectionIndex} style={styles.subsectionContainer}>
                <Text style={styles.subsectionTitle}>{subsection.name}</Text>
                {renderItems(subsection.items)}
              </View>
            ))}
      </View>
    ));

  const handleSave = () => {
    console.log('Resumo salvo:', checklist);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{checklist.title} - Resumo</Text>
      {renderSections()}
      <Text style={styles.sectionTitle}>Observações:</Text>
      <Text style={styles.itemTitle}>{checklist.operationalNotes || 'N/A'}</Text>
      <Button title='Salvar e Voltar' onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionContainer: { marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subsectionContainer: { paddingLeft: 16 },
  subsectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  itemContainer: { marginBottom: 8 },
  itemTitle: { fontSize: 16 },
  itemDescription: { fontSize: 12, fontStyle: 'italic', color: '#666' },
});

export default ChecklistSummary;
