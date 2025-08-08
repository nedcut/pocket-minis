import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable,
  ScrollView 
} from 'react-native';
import { useGameStore, Mini } from '../state/store';
import { miniCollections } from '../data/minis';
import MiniCard from '../components/MiniCard';
import GradientBackground from '../components/GradientBackground';
import { colors, shadow } from '../lib/theme';
import MiniDetailModal from '../components/MiniDetailModal';

type FilterType = 'all' | 'common' | 'rare' | 'epic' | 'legendary';
type SortType = 'name' | 'rarity' | 'collection' | 'count';

export default function CollectionScreen() {
  const { inventory } = useGameStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortType>('name');

  const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };

  const getFilteredAndSortedMinis = () => {
    let filtered = [...inventory];

    // Apply rarity filter
    if (filter !== 'all') {
      filtered = filtered.filter(mini => mini.rarity === filter);
    }

    // Apply collection filter
    if (selectedCollection) {
      filtered = filtered.filter(mini => mini.collection === selectedCollection);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          return rarityOrder[b.rarity] - rarityOrder[a.rarity]; // Higher rarity first
        case 'collection':
          return a.collection.localeCompare(b.collection);
        case 'count':
          return b.count - a.count; // Higher count first
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getCollectionStats = () => {
    const stats = {
      total: inventory.reduce((sum, mini) => sum + mini.count, 0),
      unique: inventory.length,
      byRarity: {
        common: inventory.filter(m => m.rarity === 'common').length,
        rare: inventory.filter(m => m.rarity === 'rare').length,
        epic: inventory.filter(m => m.rarity === 'epic').length,
        legendary: inventory.filter(m => m.rarity === 'legendary').length,
      }
    };
    return stats;
  };

  const filteredMinis = getFilteredAndSortedMinis();
  const stats = getCollectionStats();
  const [selectedMini, setSelectedMini] = useState<Mini | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderMiniCard = ({ item }: { item: Mini }) => (
    <MiniCard 
      mini={item} 
      size="medium"
      onPress={() => {
        setSelectedMini(item);
        setModalVisible(true);
      }}
    />
  );

  return (
    <GradientBackground>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Collection</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.unique}</Text>
            <Text style={styles.statLabel}>Unique</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, styles.legendaryText]}>{stats.byRarity.legendary}</Text>
            <Text style={styles.statLabel}>Legendary</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterTitle}>Filter by Rarity</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['all', 'legendary', 'epic', 'rare', 'common'] as FilterType[]).map((rarityFilter) => (
            <Pressable
              key={rarityFilter}
              style={[
                styles.filterButton,
                filter === rarityFilter && styles.activeFilterButton,
                rarityFilter !== 'all' && { backgroundColor: getFilterButtonColor(rarityFilter) }
              ]}
              onPress={() => setFilter(rarityFilter)}
            >
              <Text style={[
                styles.filterText,
                filter === rarityFilter && styles.activeFilterText
              ]}>
                {rarityFilter === 'all' ? 'All' : rarityFilter.charAt(0).toUpperCase() + rarityFilter.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Collection Filter */}
      <View style={styles.filtersSection}>
        <Text style={styles.filterTitle}>Filter by Collection</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={[
              styles.filterButton,
              !selectedCollection && styles.activeFilterButton
            ]}
            onPress={() => setSelectedCollection(null)}
          >
            <Text style={[
              styles.filterText,
              !selectedCollection && styles.activeFilterText
            ]}>
              All Collections
            </Text>
          </Pressable>
          {Object.entries(miniCollections).map(([key, name]) => (
            <Pressable
              key={key}
              style={[
                styles.filterButton,
                selectedCollection === key && styles.activeFilterButton
              ]}
              onPress={() => setSelectedCollection(key)}
            >
              <Text style={[
                styles.filterText,
                selectedCollection === key && styles.activeFilterText
              ]}>
                {name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.sortSection}>
        <Text style={styles.filterTitle}>Sort by</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {(['name', 'rarity', 'collection', 'count'] as SortType[]).map((sortOption) => (
            <Pressable
              key={sortOption}
              style={[
                styles.sortButton,
                sortBy === sortOption && styles.activeSortButton
              ]}
              onPress={() => setSortBy(sortOption)}
            >
              <Text style={[
                styles.sortText,
                sortBy === sortOption && styles.activeSortText
              ]}>
                {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Collection Grid */}
      {filteredMinis.length > 0 ? (
        <FlatList
          data={filteredMinis}
          renderItem={renderMiniCard}
          numColumns={3}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No Minis Found</Text>
          <Text style={styles.emptyStateText}>
            {inventory.length === 0 
              ? "Start opening packs to build your collection!"
              : "Try adjusting your filters to see more minis."
            }
          </Text>
        </View>
      )}
      <MiniDetailModal
        visible={modalVisible}
        mini={selectedMini}
        onClose={() => setModalVisible(false)}
      />
    </View>
    </GradientBackground>
  );
}

const getFilterButtonColor = (rarity: string) => {
  const colors = {
    common: '#F3F4F6',
    rare: '#EBF8FF',
    epic: '#F3E8FF',
    legendary: '#FFFBEB',
  };
  return colors[rarity as keyof typeof colors] || '#F3F4F6';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 12,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  legendaryText: {
    color: colors.warning,
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.brand,
  },
  filterText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  sortSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    marginRight: 8,
  },
  activeSortButton: {
    backgroundColor: colors.success,
  },
  sortText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeSortText: {
    color: 'white',
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});