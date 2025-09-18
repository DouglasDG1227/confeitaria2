import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Save, 
  RefreshCw, 
  DollarSign, 
  Package, 
  Edit3,
  Check,
  X,
  AlertCircle,
  Plus,
  Upload,
  Image,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';

const AdminPanel = ({ onLogout, products, onUpdateProducts }) => {
  const [editingProducts, setEditingProducts] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    basePrice: '',
    image: null,
    imagePreview: null,
    available: true
  });

  useEffect(() => {
    // Inicializar com os produtos atuais
    setEditingProducts(products.map(product => ({
      ...product,
      newPrice: parseFloat(product.basePrice) || 0,
      newDescription: product.description || '',
      newAvailable: product.available === true, // Garantir boolean correto
      isEditing: false,
      isEditingDescription: false
    })));
  }, [products]);

  const handlePriceChange = (productId, newPrice) => {
    setEditingProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, newPrice: parseFloat(newPrice) || 0 }
          : product
      )
    );
    setHasChanges(true);
  };

  const handleDescriptionChange = (productId, newDescription) => {
    setEditingProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, newDescription }
          : product
      )
    );
    setHasChanges(true);
  };

  const handleAvailabilityChange = (productId, available) => {
    console.log(`Alterando disponibilidade do produto ${productId} para:`, available);
    
    setEditingProducts(prev => {
      const updated = prev.map(product => {
        if (product.id === productId) {
          const newProduct = { ...product, newAvailable: Boolean(available) };
          console.log(`Produto ${productId} atualizado:`, {
            antes: product.newAvailable,
            depois: newProduct.newAvailable
          });
          return newProduct;
        }
        return product;
      });
      console.log('Estado atualizado dos produtos:', updated.map(p => ({ id: p.id, name: p.name, available: p.newAvailable })));
      return updated;
    });
    setHasChanges(true);
  };

  const toggleEdit = (productId, field = 'price') => {
    setEditingProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { 
              ...product, 
              isEditing: field === 'price' ? !product.isEditing : product.isEditing,
              isEditingDescription: field === 'description' ? !product.isEditingDescription : product.isEditingDescription
            }
          : product
      )
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.basePrice) {
      showNotification('Preencha todos os campos obrigatórios', 'error');
      return;
    }

    const productToAdd = {
      id: Date.now(), // ID simples baseado em timestamp
      name: newProduct.name,
      description: newProduct.description,
      basePrice: parseFloat(newProduct.basePrice),
      price: `A partir de R$ ${parseFloat(newProduct.basePrice).toFixed(2).replace('.', ',')}`,
      image: newProduct.imagePreview || '/api/placeholder/300/200', // Placeholder se não houver imagem
      available: newProduct.available
    };

    const updatedProducts = [...products, productToAdd];
    onUpdateProducts(updatedProducts);
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      basePrice: '',
      image: null,
      imagePreview: null,
      available: true
    });
    setShowAddForm(false);
    showNotification('Produto adicionado com sucesso!', 'success');
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onUpdateProducts(updatedProducts);
      showNotification('Produto excluído com sucesso!', 'success');
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    
    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aplicar mudanças aos produtos, mantendo apenas os campos essenciais
      const updatedProducts = editingProducts.map(product => {
        // Criar um novo objeto produto limpo, removendo campos de edição
        const cleanProduct = {
          id: product.id,
          name: product.name,
          description: product.newDescription,
          image: product.image,
          basePrice: product.newPrice,
          price: `A partir de R$ ${product.newPrice.toFixed(2).replace('.', ',')}`,
          available: product.newAvailable
        };
        
        return cleanProduct;
      });
      
      // Atualizar os produtos no estado principal
      onUpdateProducts(updatedProducts);
      
      // Resetar o estado de edição com os novos valores
      setEditingProducts(updatedProducts.map(product => ({
        ...product,
        newPrice: parseFloat(product.basePrice) || 0,
        newDescription: product.description || '',
        newAvailable: product.available !== false,
        isEditing: false,
        isEditingDescription: false
      })));
      
      setHasChanges(false);
      showNotification('Alterações salvas com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      showNotification('Erro ao salvar alterações', 'error');
    } finally {
      setSaving(false);
    }
  };

  const cancelChanges = () => {
    // Resetar para os valores originais dos produtos
    setEditingProducts(products.map(product => ({
      ...product,
      newPrice: parseFloat(product.basePrice) || 0,
      newDescription: product.description || '',
      newAvailable: product.available === true, // Garantir boolean correto
      isEditing: false,
      isEditingDescription: false
    })));
    setHasChanges(false);
    showNotification('Alterações canceladas', 'info');
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-3 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffe682]" />
            <h1 className="text-lg sm:text-2xl font-bold text-[#ffe682]">
              Painel Administrativo - Casa Caramelo
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:space-x-4 w-full sm:w-auto">
            {hasChanges && (
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={cancelChanges}
                  className="px-3 py-2 sm:px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
                >
                  <X size={14} sm:size={16} />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className="px-3 py-2 sm:px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 disabled:opacity-50 text-sm sm:text-base flex-1 sm:flex-none justify-center"
                >
                  {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                  <span className="hidden sm:inline">{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
                  <span className="sm:hidden">Salvar</span>
                </button>
              </div>
            )}
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-2 sm:px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
            >
              <Plus size={14} sm:size={16} />
              <span className="hidden sm:inline">Adicionar Produto</span>
              <span className="sm:hidden">Adicionar</span>
            </button>
            
            <button
              onClick={onLogout}
              className="px-3 py-2 sm:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
            >
              <LogOut size={14} sm:size={16} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
          notification.type === 'success' ? 'bg-green-600' :
          notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`}>
          <AlertCircle size={16} />
          <span>{notification.message}</span>
        </div>
      )}

      <div className="p-3 sm:p-6">
        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-[#ffe682] mb-4 flex items-center space-x-2">
              <Plus size={20} />
              <span>Adicionar Novo Produto</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ffe682]"
                    placeholder="Ex: Brigadeiros Gourmet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ffe682]"
                    placeholder="Descrição detalhada do produto..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preço Base (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.basePrice}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, basePrice: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#ffe682]"
                    placeholder="0.00"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={newProduct.available}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, available: e.target.checked }))}
                    className="w-4 h-4 text-[#ffe682] bg-gray-800 border-gray-600 rounded focus:ring-[#ffe682]"
                  />
                  <label htmlFor="available" className="text-sm text-gray-300">
                    Produto disponível
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Imagem do Produto
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  {newProduct.imagePreview ? (
                    <div className="space-y-2">
                      <img
                        src={newProduct.imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setNewProduct(prev => ({ ...prev, image: null, imagePreview: null }))}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remover imagem
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Image className="w-12 h-12 text-gray-500 mx-auto" />
                      <p className="text-gray-500 text-sm">Clique para adicionar imagem</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                      >
                        <Upload size={16} />
                        <span>Escolher Arquivo</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addNewProduct}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Adicionar Produto</span>
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {editingProducts.map((product) => (
            <div key={`${product.id}-${product.newAvailable}`} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1 z-20">
                  <button
                    onClick={() => handleAvailabilityChange(product.id, !product.newAvailable)}
                    className={`p-2 sm:p-3 rounded-full ${
                      product.newAvailable 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    } transition-colors relative z-30 touch-manipulation`}
                    title={product.newAvailable ? 'Produto disponível' : 'Produto indisponível'}
                  >
                    {product.newAvailable ? <Eye size={16} className="sm:w-5 sm:h-5" /> : <EyeOff size={16} className="sm:w-5 sm:h-5" />}
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 sm:p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors relative z-30 touch-manipulation"
                    title="Excluir produto"
                  >
                    <Trash2 size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
                {!product.newAvailable && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <span className="text-white font-bold text-lg">INDISPONÍVEL</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 space-y-3">
                <h3 className="text-lg font-bold text-[#ffe682]">{product.name}</h3>
                
                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Descrição:</label>
                    <button
                      onClick={() => toggleEdit(product.id, 'description')}
                      className="text-[#ffe682] hover:text-[#ffd93d] transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                  {product.isEditingDescription ? (
                    <div className="space-y-2">
                      <textarea
                        value={product.newDescription}
                        onChange={(e) => handleDescriptionChange(product.id, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-[#ffe682]"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleEdit(product.id, 'description')}
                          className="p-1 bg-green-600 hover:bg-green-700 rounded transition-colors"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => {
                            handleDescriptionChange(product.id, product.description);
                            toggleEdit(product.id, 'description');
                          }}
                          className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm">{product.newDescription}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Preço:</label>
                    <button
                      onClick={() => toggleEdit(product.id, 'price')}
                      className="text-[#ffe682] hover:text-[#ffd93d] transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                  {product.isEditing ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 flex-1">
                        <DollarSign size={16} className="text-gray-400" />
                        <input
                          type="number"
                          step="0.01"
                          value={product.newPrice}
                          onChange={(e) => handlePriceChange(product.id, e.target.value)}
                          className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-[#ffe682]"
                        />
                      </div>
                      <button
                        onClick={() => toggleEdit(product.id, 'price')}
                        className="p-1 bg-green-600 hover:bg-green-700 rounded transition-colors"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => {
                          handlePriceChange(product.id, product.basePrice);
                          toggleEdit(product.id, 'price');
                        }}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-[#ffe682] font-semibold">
                      A partir de R$ {product.newPrice.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-sm text-gray-300">Status:</span>
                  <span className={`text-sm font-medium ${
                    product.newAvailable ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {product.newAvailable ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editingProducts.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-500 text-sm mt-2">
              Adicione produtos para começar a gerenciar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
